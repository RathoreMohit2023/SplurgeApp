import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const PDFViewer = ({ route }) => {
    const { url } = route.params;
  return (
    <View style={{ flex: 1 }}>
        <WebView 
            source={{ uri: url}}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            )}
        />
    </View>
  );
};

export default PDFViewer;