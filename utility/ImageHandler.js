import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

export async function cropImageToSquare(uri, width, height) {
  const newImage = await ImageManipulator.manipulateAsync(
    uri,
    [
      {
        crop: {
          originX: 0,
          originY: (height - width) / 2,
          width: width,
          height: width,
        },
      },
      { resize: { width: 1024 } },
    ],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );

  //Returns { uri, width, height } where uri is a URI to the modified image
  return newImage;
}

export async function scaleImageToSmall(uri, width, height) {
  const newImage = await ImageManipulator.manipulateAsync(uri, [
    { resize: { width: 256 } },
  ]);
  //Returns { uri, width, height } where uri is a URI to the modified image
  return newImage;
}
