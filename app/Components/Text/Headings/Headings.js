import { Text, StyleSheet } from "react-native";

export const SmallText = ({ children, weight, color, sx }) => {
  return (
    <Text style={[styles.small, sx, { fontWeight: weight, color: color }]}>
      {children}
    </Text>
  );
};

export const MediumText = ({ children, weight, color, sx }) => {
  return (
    <Text style={[styles.medium, sx, { fontWeight: weight, color: color }]}>
      {children}
    </Text>
  );
};

export const SmallHeadingText = ({ children, weight, color, sx }) => {
  return (
    <Text
      style={[
        styles.smallHeadingText,
        sx,
        { fontWeight: weight, color: color }
      ]}>
      {children}
    </Text>
  );
};

export const SubHeadingText = ({ children, weight, color, sx }) => {
  return (
    <Text style={[styles.subHeading, sx, { fontWeight: weight, color: color }]}>
      {children}
    </Text>
  );
};

export const HeadingText = ({ children, weight, color }) => {
  return (
    <Text style={[styles.HeadingText, { fontWeight: weight, color: color }]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  small: {
    fontSize: 11
  },
  medium: {
    fontSize: 14
  },
  smallHeadingText: {
    fontSize: 17
  },
  subHeading: {
    fontSize: 25
  },
  HeadingText: {
    fontSize: 34
  }
});
