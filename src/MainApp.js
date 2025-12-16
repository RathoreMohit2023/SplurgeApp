import React, { useEffect, useMemo } from "react";
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "../src/navigation/rootNavigator";
import { PaperProvider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import notifee from '@notifee/react-native';

import { requestPermissions, getFCMToken, onForegroundMessage, onBackgroundMessage, onNotificationOpened } from './services/FcmService';
import { setFcmToken } from './Redux/Slice/FcmSlice';
import { addNotification } from './Redux/Slice/NotificationSlice';
import { GetPaymentLogApi } from "./Redux/Api/GetPaymentLogApi";

const MainApp = () => {
  const { LoginData } = useSelector(state => state.Login);
  const { Notifications } = useSelector(state => state.Notifications);
  const dispatch = useDispatch();

  const currentUserId = LoginData?.user?.id || LoginData?.user_id;

  const unreadCount = useMemo(() => {
    if (!Notifications || !currentUserId) return 0;
    return Notifications.filter(n => n.userId === currentUserId && !n.read).length;
  }, [Notifications, currentUserId]);

  useEffect(() => {
    const updateBadge = async () => {
      try {
        if (currentUserId) {
          await notifee.setBadgeCount(unreadCount);
        } else {
          await notifee.setBadgeCount(0);
        }
      } catch (error) {
        console.log("Badge Error:", error);
      }
    };
    updateBadge();
  }, [unreadCount, currentUserId]);

  const handleNewNotification = (remoteMessage) => {
    if (!remoteMessage) return;
    
    if (!currentUserId) return; 

    const newNotif = {
      id: remoteMessage.messageId,
      title: remoteMessage.notification?.title || "New Notification",
      message: remoteMessage.notification?.body || "",
      type: remoteMessage.data?.type || "default",
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      read: false,
      data: remoteMessage.data,
      userId: currentUserId, 
    };

    dispatch(addNotification(newNotif));
    
    if (LoginData?.token) {
      dispatch(GetPaymentLogApi(LoginData.token));
    }
  };

  useEffect(() => {
    (async () => {
      const granted = await requestPermissions();
      if (!granted) return;

      const token = await getFCMToken();
      dispatch(setFcmToken(token));

      const fg = onForegroundMessage(msg => {
        handleNewNotification(msg);
      });

      onBackgroundMessage(msg => {
        handleNewNotification(msg);
      });

      onNotificationOpened(msg => {
        handleNewNotification(msg);
      });

      return () => fg();
    })();
  }, [LoginData]);

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default MainApp;