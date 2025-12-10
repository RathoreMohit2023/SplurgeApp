import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemeContext } from "../components/ThemeContext";
import DashedLoader from './DashedLoader';
import { X } from "lucide-react-native";

const PDFViewer = ({ route, navigation }) => {
  const { colors } = useContext(ThemeContext);
  const { url } = route.params;

  return (
    <View style={{ flex: 1 }}>
      
      {/* Close Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          zIndex: 999,
          backgroundColor: colors.card,
          padding: 8,
          borderRadius: 50,
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: 2 }
        }}
      >
        <X size={22} color={colors.textPrimary} />
      </TouchableOpacity>

      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        renderLoading={() => (
          <DashedLoader color={colors.primary} size={100} />
        )}
      />
    </View>
  );
};

export default PDFViewer;
