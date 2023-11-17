export const data = {
  user_id: "123456",
  init_images: [], // Original image address
  denoising_strength: 0, // Range 0-1, smaller value closer to original image. Larger value more likely to let imagination fly
  prompt: "",
  negative_prompt: "",
  seed: -1, // Initial seed
  batch_size: 1, // How many images generated each time
  n_iter: 1, // number of iterations
  steps: 50, // Number of runs, this value can be fine tuned, converging when too high, max 150 in webui, maybe can go higher here?
  cfg_scale: 7, // Influence of prompt text on image, usually 5-15, max 30 in webui, can fine tune
  restore_faces: false, // Whether to correct faces, for 3D, test later if open or not. Suggest False for now
  sampler_name: "DPM++ 2M Karras",
  sampler_index: "DPM++ 2M Karras", // or "DPM++ 2M Karras"
  override_settings: {
    sd_model_checkpoint: "majicmixRealistic_v6.safetensors",
  },
  // alwayson_scripts: {
  // roop: {
  //   is_img2img: true,
  //   is_alwayson: true,
  //   args: [
  //     "", //0 File Input
  //     true, //1 Enable Roop
  //     "0", //2 Comma separated face number(s)
  //     "/home/vipuser/code/" +
  //       "stable_diffusion_webui/models/roop/inswapper_128.onnx", //3 Model
  //     "CodeFormer", //4 Restore Face: None; CodeFormer; GFPGAN
  //     1, //5 Restore visibility value
  //     true, //6 Restore face -> Upscale
  //     "None", //7 Upscaler (type 'None' if doesn't need), see full list here: http://127.0.0.1:7860/sdapi/v1/script-info -> roop-ge -> sec.8
  //     1, //8 Upscaler scale value
  //     1, //9 Upscaler visibility (if scale = 1)
  //     false, //10 Swap in source image
  //     true, //11 Swap in generated image
  //   ],
  // },
  // "ADetailer": {
  //     "args": adtail_args
  // },
  // "controlnet": {
  //     "args": controlnet_args,
  // },
  // },
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
    2, // custom_scale
  ],
};

const ultimate_sd_upscale_args = [
  null, // _ (not used)
  512, // tile_width
  512, // tile_height
  8, // mask_blur
  32, // padding
  64, // seams_fix_width
  0.35, // seams_fix_denoise
  32, // seams_fix_padding
  3, // upscaler_index
  true, // save_upscaled_image a.k.a Upscaled
  0, // redraw_mode:"Linear","Chess","null"
  false, // save_seams_fix_image a.k.a Seams fix
  8, // seams_fix_mask_blur
  0, // seams_fix_type
  2, // target_size_type
  1080, // custom_width
  1920, // custom_height
  2, // custom_scale
];
