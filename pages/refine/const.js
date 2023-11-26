//1、换脸
export const swap_face_data = {
  user_id: "123456",
  init_images: [], // Original image address
  denoising_strength: 0, // Range 0-1, smaller value closer to original image. Larger value more likely to let imagination fly
  prompt: "",
  negative_prompt: "",
  seed: -1, // Initial seed
  batch_size: 1, // How many images generated each time
  n_iter: 1, // number of iterations
  steps: 1, // Number of runs, this value can be fine tuned, converging when too high, max 150 in webui, maybe can go higher here?
  cfg_scale: 1, // Influence of prompt text on image, usually 5-15, max 30 in webui, can fine tune
  restore_faces: false, // Whether to correct faces, for 3D, test later if open or not. Suggest false for now
  sampler_name: "DPM++ 2M Karras",
  sampler_index: "DPM++ 2M Karras", // or "DPM++ 2M Karras"
  override_settings: {
    sd_model_checkpoint: "majicmixRealistic_v6.safetensors",
  },
  alwayson_scripts: {
    roop: {
      is_img2img: true,
      is_alwayson: true,
      args: [
        "", //0 File Input
        true, //1 Enable Roop
        "0", //2 Comma separated face number(s)
        "/home/vipuser/code/" +
          "stable_diffusion_webui/models/roop/inswapper_128.onnx", //3 Model
        "CodeFormer", //4 Restore Face: None; CodeFormer; GFPGAN
        1, //5 Restore visibility value
        true, //6 Restore face -> Upscale
        "None", //7 Upscaler (type 'None' if doesn't need), see full list here: http://127.0.0.1:7860/sdapi/v1/script-info -> roop-ge -> sec.8
        1, //8 Upscaler scale value
        1, //9 Upscaler visibility (if scale = 1)
        false, //10 Swap in source image
        true, //11 Swap in generated image
      ],
    },
  },
};

//2、换脸+增加脸部细节
export const swap_face_and_add_detail_data = {
  user_id: "123456",
  init_images: [], // Original image address
  denoising_strength: 0, // Range 0-1, smaller value closer to original image. Larger value more likely to let imagination fly
  prompt: "",
  negative_prompt: "",
  seed: -1, // Initial seed
  batch_size: 1, // How many images generated each time
  n_iter: 1, // number of iterations
  steps: 1, // Number of runs, this value can be fine tuned, converging when too high, max 150 in webui, maybe can go higher here?
  cfg_scale: 1, // Influence of prompt text on image, usually 5-15, max 30 in webui, can fine tune
  restore_faces: false, // Whether to correct faces, for 3D, test later if open or not. Suggest false for now
  sampler_name: "DPM++ 2M Karras",
  sampler_index: "DPM++ 2M Karras", // or "DPM++ 2M Karras"
  override_settings: {
    sd_model_checkpoint: "majicmixRealistic_v6.safetensors",
  },
  alwayson_scripts: {
    roop: {
      is_img2img: true,
      is_alwayson: true,
      args: [
        "", //0 File Input
        true, //1 Enable Roop
        "0", //2 Comma separated face number(s)
        "/home/vipuser/code/" +
          "stable_diffusion_webui/models/roop/inswapper_128.onnx", //3 Model
        "CodeFormer", //4 Restore Face: None; CodeFormer; GFPGAN
        1, //5 Restore visibility value
        true, //6 Restore face -> Upscale
        "None", //7 Upscaler (type 'None' if doesn't need), see full list here: http://127.0.0.1:7860/sdapi/v1/script-info -> roop-ge -> sec.8
        1, //8 Upscaler scale value
        1, //9 Upscaler visibility (if scale = 1)
        false, //10 Swap in source image
        true, //11 Swap in generated image
      ],
    },
    ADetailer: {
      args: [
        true,
        {
          ad_model: "mediapipe_face_full",
          ad_prompt: "<lora:more_details:1>, <lora:pytorch_lora_weights:1>",
          ad_negative_prompt: "EasyNegative",
          ad_confidence: 0.3,
          ad_mask_k_largest: 0,
          ad_mask_min_ratio: 0.0,
          ad_mask_max_ratio: 1.0,
          ad_dilate_erode: 32,
          ad_x_offset: 0,
          ad_y_offset: 0,
          ad_mask_merge_invert: "None",
          ad_mask_blur: 4,
          ad_denoising_strength: 0.4, //增加的细节幅度，最大为1
          ad_inpaint_only_masked: true,
          ad_inpaint_only_masked_padding: 0,
          ad_use_inpaint_width_height: false,
          ad_inpaint_width: 512,
          ad_inpaint_height: 512,
          ad_use_steps: true,
          ad_steps: 5,
          ad_use_cfg_scale: true,
          ad_cfg_scale: 1.5,
          ad_use_sampler: true,
          ad_sampler: "DPM++ 2M Karras",
          ad_use_noise_multiplier: false,
          ad_noise_multiplier: 1.0,
          ad_use_clip_skip: false,
          ad_clip_skip: 1,
          ad_restore_face: false,
          ad_controlnet_model: "control_v11f1e_sd15_tile [a371b31b]",
          ad_controlnet_module: null,
          ad_controlnet_weight: 1.0,
          ad_controlnet_guidance_start: 0.0,
          ad_controlnet_guidance_end: 1.0,
        },
      ],
    },
  },
};

//3、超分：默认放大1.5倍
export const scale_data = {
  user_id: "123456",
  init_images: [], // Original image address
  denoising_strength: 0.4, // Range 0-1, smaller value closer to original image. Larger value more likely to let imagination fly
  prompt: "<lora:pytorch_lora_weights:1>",
  negative_prompt: "",
  seed: -1, // Initial seed
  batch_size: 1, // How many images generated each time
  n_iter: 1, // number of iterations
  steps: 5, // Number of runs, this value can be fine tuned, converging when too high, max 150 in webui, maybe can go higher here?
  cfg_scale: 1.5, // Influence of prompt text on image, usually 5-15, max 30 in webui, can fine tune
  restore_faces: false, // Whether to correct faces, for 3D, test later if open or not. Suggest false for now
  sampler_name: "DPM++ 2M Karras",
  sampler_index: "DPM++ 2M Karras", // or "DPM++ 2M Karras"
  override_settings: {
    sd_model_checkpoint: "majicmixRealistic_v6.safetensors",
  },
  script_name: "ultimate sd upscale",
  script_args: [
    null, // _ (not used)
    512, // tile_width
    512, // tile_height
    8, // mask_blur
    32, // padding
    64, // seams_fix_width
    0.35, // seams_fix_denoise
    32, // seams_fix_padding
    1, // upscaler_index
    true, // save_upscaled_image a.k.a Upscaled
    0, // redraw_mode:"Linear","Chess","null"
    false, // save_seams_fix_image a.k.a Seams fix
    8, // seams_fix_mask_blur
    0, // seams_fix_type
    2, // target_size_type
    1080, // custom_width
    1920, // custom_height
    1.5, // custom_scale:当upscaler_index为3时，该值决定输出的倍数
  ],
};

//4、局部重绘
export const mask_data = {
  user_id: "123456",
  init_images: [], // Original image address
  denoising_strength: 0.4, // Range 0-1, smaller value closer to original image. Larger value more likely to let imagination fly
  prompt: "<lora:pytorch_lora_weights:1>",
  negative_prompt: "EasyNegative",
  mask: "", //base64蒙版图片，宽高必须和init_images一致
  mask_blur: 4,
  mask_blur_x: 4,
  mask_blur_y: 4,
  inpainting_mask_invert: 0,
  inpaint_full_res: 1, //["Whole picture", "Only masked"]
  inpainting_fill: 1, //['fill', 'original', 'latent noise', 'latent nothing']
  inpaint_full_res_padding: 32,
  seed: -1, // Initial seed
  batch_size: 1, // How many images generated each time
  n_iter: 1, // number of iterations
  steps: 3, // Number of runs, this value can be fine tuned, converging when too high, max 150 in webui, maybe can go higher here?
  cfg_scale: 1, // Influence of prompt text on image, usually 5-15, max 30 in webui, can fine tune
  restore_faces: false, // Whether to correct faces, for 3D, test later if open or not. Suggest false for now
  sampler_name: "DPM++ 2M Karras",
  sampler_index: "DPM++ 2M Karras", // or "DPM++ 2M Karras"
  override_settings: {
    sd_model_checkpoint: "majicmixRealistic_v6.safetensors",
  },
};
