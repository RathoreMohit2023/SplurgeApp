import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Notifications: [], // List of objects
};

const NotificationSlice = createSlice({
  name: 'Notifications',
  initialState,
  reducers: {
    // Naya notification add karne ke liye
    addNotification: (state, action) => {
      // Naya msg top par add hoga
      state.Notifications.unshift(action.payload); 
    },
    // Notification ko read mark karne ke liye
    markAsRead: (state, action) => {
      const index = state.Notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        state.Notifications[index].read = true;
      }
    },
    // Sab clear karne ke liye
    clearNotifications: (state) => {
      state.Notifications = [];
    }
  },
});

export const { addNotification, markAsRead, clearNotifications } = NotificationSlice.actions;
export default NotificationSlice.reducer;