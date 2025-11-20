import { StyleSheet } from "react-native";

const ProfileStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
      },
      inner: {
        padding: 16,
      },
    
      headerRow: {
        marginBottom: 6,
      },
      heading: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
      },
      subheading: {
        color: "#aaa",
        marginTop: 4,
      },
    
      profileCard: {
        backgroundColor: "#1A1A1A",
        borderRadius: 12,
        marginBottom: 12,
      },
      profileCardContent: {
        paddingVertical: 12,
        paddingHorizontal: 12,
      },
      row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      },
      avatar: {
        backgroundColor: "#7C3BEC",
      },
      profileInfo: {
        flex: 1,
        marginLeft: 12,
      },
      name: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
      },
      rankBadge: {
        backgroundColor: "#7C3BEC",
        color: "#fff",
      },
      contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 6,
      },
      contactText: {
        color: "#aaa",
        marginLeft: 6,
      },
      code: {
        backgroundColor: "rgba(255,255,255,0.03)",
        color: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontFamily: "monospace",
        fontSize: 12,
        alignSelf: "flex-start",
      },
    
      /* Stats grid */
      statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 8,
        gap: 8,
      },
      statCard: {
        width: "48%",
        backgroundColor: "#25202C",
        borderRadius: 12,
        marginBottom: 8,
      },
      statContent: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      statValue: {
        color: "#fff",
        fontWeight: "700",
        marginTop: 8,
      },
      statLabel: {
        color: "#aaa",
        fontSize: 12,
        marginTop: 4,
      },
    
      /* generic card */
      card: {
        backgroundColor: "#1A1A1A",
        borderRadius: 12,
        marginBottom: 12,
      },
      cardTitle: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
      },
    
      menuRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
      },
      menuLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      },
      menuLabel: {
        color: "#fff",
        fontSize: 15,
      },
      menuIcon: {
        margin: 0,
        backgroundColor: "transparent",
      },
    
      aboutRow: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      aboutLabel: {
        color: "#aaa",
      },
      aboutValue: {
        color: "#fff",
        fontWeight: "700",
      },
    
      linkRow: {
        paddingVertical: 8,
      },
      linkText: {
        color: "#7C3BEC",
        fontWeight: "600",
      },
    
      logoutBtn: {  
        marginTop: 8,
        backgroundColor: "#FF3B30",
        borderRadius: 10,
      },
});

export default ProfileStyle;