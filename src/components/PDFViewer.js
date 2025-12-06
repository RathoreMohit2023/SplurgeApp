import React, {useContext} from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemeContext } from "../components/ThemeContext";
import DashedLoader from './DashedLoader';


const PDFViewer = ({ route }) => {
  const { colors } = useContext(ThemeContext);
  const { url } = route.params;

  return (
    <View style={{ flex: 1 }}>
        <WebView 
            source={{ uri: url}}
            startInLoadingState={true}
            renderLoading={() => 
              (<DashedLoader color={colors.primary} size={100} />)
            }
        />
    </View>
  );
};

export default PDFViewer;