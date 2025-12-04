import React, { useEffect, useState, useContext, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlayCircle, Clock, CheckCircle2 } from 'lucide-react-native';
import getFoundersStyle from "../../../styles/MainScreen/learnTabs/founderStyle"; // Import Style Function
import { ThemeContext } from "../../../components/ThemeContext"; 
import { GetFounderApi } from '../../../Redux/Api/GetFounderApi';
import { useDispatch, useSelector } from 'react-redux';
import ModalVideoPlayer from '../../../Modals/ModalVideoPlayer';

const Founders = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getFoundersStyle(colors), [colors]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { LoginData } = useSelector(state => state.Login);
  const { GetFounderloading, GetFounderData } = useSelector(state => state.GetFounder);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFounderApi(LoginData.token));
  }, []);

  const videos = GetFounderData?.founderVedio || [];

  return (
    <View style={styles.tabContainer}>

      {GetFounderloading && (
        <ActivityIndicator size="large" color={colors.theme} style={{ marginTop: 20 }} />
      )}

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemCard} 
            activeOpacity={0.7}
            onPress={() => setSelectedVideo(item.url)}  
          >
            <View style={styles.largeThumbnail}>
              <PlayCircle size={32} color={colors.theme} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>

              <View style={styles.row}>
                <View style={styles.metaRow}>
                  <Clock size={12} color={colors.textSecondary} />
                  <Text style={styles.subText}>{item.duration}</Text>
                </View>

                {/* {item.watched && (
                    <View style={styles.badge}>
                    <CheckCircle2 size={14} color={colors.success} />
                    <Text style={styles.badgeText}>Watched</Text>
                    </View>
                )} */}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <ModalVideoPlayer
        visible={!!selectedVideo}
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

    </View>
  )
}

export default Founders;