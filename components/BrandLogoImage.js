import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as storage from "../data_model/Storage";

const BrandLogoImage = ({ logo, style }) => {
  const [brandlogo, setLogo] = useState(
    require("../assets/brand_logos/logo_unknown.png")
  );
  const [logoString, setLogoString] = useState("unknown");

  useEffect(() => {
    if (logoString !== logo) {
      setLogoString(logo);
      Object.entries(storage.BrandLogos).forEach((prop) => {
        if (logo === prop[0]) {
          setLogo(prop[1]);
          console.log("setting logo to: " + prop[0]);
        }
      });
    }
  });

  return (
    <Image
      source={brandlogo}
      resizeMode="cover"
      style={[styles.brandStyle, style]}
    />
  );
};

const styles = StyleSheet.create({
  brandStyle: {
    height: 35,
    width: 90,
    borderRadius: 8,
  },
});

export default BrandLogoImage;
