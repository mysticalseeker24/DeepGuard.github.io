import torch
from torch.utils.model_zoo import load_url
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import matplotlib.pyplot as plt
from scipy.special import expit

import sys
import os
sys.path.append('..')

from blazeface import FaceExtractor, BlazeFace, VideoReader
from architectures import fornet,weights
from isplutils import utils

"""
Choose an architecture between
- EfficientNetB4
- EfficientNetB4ST
- EfficientNetAutoAttB4
- EfficientNetAutoAttB4ST
- Xception
"""
net_model = 'EfficientNetAutoAttB4'

"""
Choose a training dataset between
- DFDC
- FFPP
"""
train_db = 'DFDC'

app = Flask(__name__)
CORS(app)

device = torch.device('cpu')
face_policy = 'scale'
face_size = 224
frames_per_video = 100

model_url = weights.weight_url['{:s}_{:s}'.format(net_model,train_db)]
net = getattr(fornet,net_model)().eval().to(device)
net.load_state_dict(load_url(model_url,map_location=device,check_hash=True))

transf = utils.get_transformer(face_policy, face_size, net.get_normalizer(), train=False)

facedet = BlazeFace().to(device)
facedet.load_weights("../blazeface/blazeface.pth")
facedet.load_anchors("../blazeface/anchors.npy")

@app.route('/upload-video', methods=['POST'])
def upload_video():
    try:
        if 'video' not in request.files:
            return jsonify({"error": "No video uploaded"}), 400
        if 'frames_per_video' not in request.form:
            return jsonify({"error": "frames_per_video parameter missing"}), 400

        video = request.files['video']
        frames_per_video = int(request.form['frames_per_video'])

        # Save the uploaded video temporarily
        video_path = 'input_video.mp4'
        video.save(video_path)

        # Process the video
        videoreader = VideoReader(verbose=False)
        video_read_fn = lambda x: videoreader.read_frames(x, num_frames=frames_per_video)
        face_extractor = FaceExtractor(video_read_fn=video_read_fn, facedet=facedet)
        vid_face_extractor = face_extractor.process_video(video_path)

        im_face = torch.stack([transf(image=frame['faces'][0])['image']
                               for frame in vid_face_extractor if len(frame['faces'])])

        with torch.no_grad():
            faces_pred = net(im_face.to(device)).cpu().numpy().flatten()

        mean_score = expit(faces_pred.mean())
        faces_pred = expit(faces_pred)

        os.remove(video_path)
        return jsonify({
            "pred_scores": faces_pred.tolist(),
            "mean_score": float(mean_score)
        }), 200

    except Exception as e:
        print("Error:", str(e))  # Log the error message
        return jsonify({"error": str(e)}), 500


@app.after_request
def add_headers(response):
    response.headers['Content-Type'] = 'application/json'
    return response

if __name__ == '__main__':
    app.run(debug=True, port = 8080)