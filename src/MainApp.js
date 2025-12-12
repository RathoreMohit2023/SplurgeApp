import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "../src/navigation/rootNavigator";
import { PaperProvider } from "react-native-paper";
import { useDispatch } from "react-redux";
import { requestPermissions, getFCMToken, onForegroundMessage, onBackgroundMessage, onNotificationOpened } from './services/FcmService';
import { setFcmToken } from './Redux/Slice/FcmSlice';
import { addNotification } from './Redux/Slice/NotificationSlice'; // Import kiya

const MainApp = () => {
  const dispatch = useDispatch();

  // Helper function to format incoming FCM data
  const handleNewNotification = (remoteMessage) => {
    if(!remoteMessage) return;

    const newNotif = {
      id: remoteMessage.messageId, // Unique ID from FCM
      title: remoteMessage.notification?.title || "New Notification",
      message: remoteMessage.notification?.body || "",
      type: remoteMessage.data?.type || "default", // e.g., 'settle_request'
      time: new Date().toLocaleTimeString(), // Current time
      read: false,
      // API call ke liye sara zaruri data yahan store karein
      data: remoteMessage.data, 
    };

    dispatch(addNotification(newNotif));
  };

  useEffect(() => {
    (async () => {
      const granted = await requestPermissions();
      if (!granted) return;

      const token = await getFCMToken();
      dispatch(setFcmToken(token));

      // 1. Foreground Message
      const fg = onForegroundMessage(msg => {
        console.log("🔥 Foreground:", msg);
        handleNewNotification(msg);
      });

      // 2. Background Message (Optional: agar handler alag file m h toh waha dispatch nahi chalega, but agar yahi logic h to thik h)
      onBackgroundMessage(msg => {
        console.log("🔥 Background:", msg);
        // Note: Background handling headless JS se hoti hai, 
        // usually Redux store update tab dikhega jab app open hogi.
        handleNewNotification(msg);
      });

      // 3. App Opened from Notification
      onNotificationOpened(msg => {
        console.log("📌 Tap:", msg);
        handleNewNotification(msg);
      });

      return () => fg();
    })();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default MainApp;