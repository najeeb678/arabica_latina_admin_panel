import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
  Button,
  Switch,
  Tooltip,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { AppDispatch } from "@/redux/store";
import { formatRelativeTime, getRole, getUserId } from "@/utils/utils";
import { format } from "date-fns";
import {
  getNotificationByRole,
  markAllAdminNotificationAsRead,
  markAllDoctorNotificationAsRead,
  markAsReadAdminNotifications,
  markAsReadDoctorNotifications,
} from "@/redux/slices/authSlice";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import NotificationModal from "./NotificationsModal";

const Notifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  const unreadNotificationCount = useSelector(
    (state: any) => state.auth.unreadNotificationCount
  );

  const formatDate = (date: string | Date): string => {
    return format(new Date(date), "EEEE, dd MMM yyyy");
  };
  const formatDateTime = (date: string | Date): string => {
    try {
      const formattedDate = format(new Date(date), "hh:mm a, dd MMM yyyy");
      return formattedDate;
    } catch (error) {
      console.error("Error formatting date:", date, error);
      return "Invalid Date";
    }
  };
  const fetchNotifications = () => {
    const userRole = getRole() || "";

    setRole(userRole);

    const doctorId =
      userRole === "Doctor" ? getUserId() || undefined : undefined;

    dispatch(getNotificationByRole({ role: userRole, doctorId }))
      .unwrap()
      .then((res: any) => {
        if (Array.isArray(res)) {
          setNotifications(res);
        }
      })
      .catch((error) => console.error("Failed to fetch notifications:", error));
  };

  useEffect(() => {
    const id = getUserId();
    setUserId(id);
    fetchNotifications();
  }, [dispatch]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleNotificationClick = (notif: any) => {
    setSelectedNotification(notif);
    setIsModalOpen(true);
  };
  const handleSeeAll = () => {
    router.push("/notifications");
    handleClose();
  };
  const handleMarkAllAsRead = (event: any) => {
    const checked = event.target.checked;

    if (!checked) {
      return; // If toggled off, do nothing
    }

    if (role === "Admin") {
      dispatch(markAllAdminNotificationAsRead())
        .unwrap()
        .then(() => {
          setNotifications((prev) =>
            prev.map((notif) => ({ ...notif, read: true }))
          );
        })
        .catch((error) =>
          console.error("Failed to mark all notifications as read:", error)
        );
    } else if (role === "Doctor") {
      dispatch(markAllDoctorNotificationAsRead({ doctorId: userId }))
        .unwrap()
        .then(() => {
          setNotifications((prev) =>
            prev.map((notif) => ({ ...notif, read: true }))
          );
        })
        .catch((error) =>
          console.error("Failed to mark all notifications as read:", error)
        );
    }
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={unreadNotificationCount} color="warning">
          <NotificationsNoneOutlinedIcon
            sx={{ color: "#7B7B7B", width: "26px", height: "26px" }}
          />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "505px",
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
            padding: "10px 16px 5px 16px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomTypography
            sx={{
              fontWeight: "450",
              fontSize: "16px",
            }}
          >
            Notifications
          </CustomTypography>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "-5px" }}
          >
            <CustomTypography
              sx={{
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "14px",
                fontFamily: "Avenir",
              }}
            >
              {formatDate(new Date())}
            </CustomTypography>
            <Tooltip
              title="Mark all as read"
              placement="top"
              arrow
              sx={{
                color: "#fbc02d",
                backgroundColor: "#fbc02d",
              }}
            >
              <Switch
                value="markAllAsRead"
                onChange={handleMarkAllAsRead}
                sx={{
                  //   ".MuiSwitch-thumb": {
                  //     backgroundColor: "#F0A000",
                  //   },
                  //   ".MuiSwitch-track": {
                  //     backgroundColor: "#F0A000",
                  //   },
                  "& .MuiSwitch-switchBase": {
                    "&.Mui-checked": {
                      "+ .MuiSwitch-track": {
                        backgroundColor: "#9e9e9e",
                      },
                      ".MuiSwitch-thumb": {
                        backgroundColor: "#fbc02d",
                      },
                    },
                  },
                }}
              />
            </Tooltip>
          </Box>
        </Box>

        <Divider sx={{ marginBottom: "8px" }} />
        {notifications?.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "40vh",
              textAlign: "center",
            }}
          >
            <img
              src="/images/no-data.png"
              alt="No Data"
              style={{
                width: "150px",
                height: "auto",
                marginBottom: "20px",
              }}
            />
            <Typography variant="h6" color="textSecondary">
              No notifications available
            </Typography>
          </Box>
        )}
        {role === "Doctor"
          ? notifications.map((notif: any) => (
              <MenuItem
                key={notif.id}
                onClick={() => {
                  if (!notif.read) {
                    dispatch(
                      markAsReadDoctorNotifications({
                        notificationId: notif.id,
                        doctorId: userId,
                      })
                    )
                      .unwrap()
                      .then(() => {
                        setNotifications((prev) =>
                          prev.map((n) =>
                            n.id === notif.id ? { ...n, read: true } : n
                          )
                        );
                      })
                      .catch((error) =>
                        console.error(
                          "Failed to mark notification as read:",
                          error
                        )
                      );
                  }
                  handleNotificationClick(notif);
                }}
                sx={{
                  display: "block",
                  padding: "16px",
                  fontFamily: "Avenir",
                  height: "66px",
                  backgroundColor: notif.read ? "#F5F5F5" : "#FBC02D1F",
                  marginBottom: "8px",
                  "&:hover": {
                    backgroundColor: notif.read ? "#E0E0E0" : "#F0F0F0",
                    color: "inherit",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CustomTypography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "12px",
                        fontFamily: "Avenir",
                      }}
                    >
                      {notif?.Appointment?.patientId?.name}
                    </Typography>{" "}
                    <Typography
                      component="span"
                      sx={{
                        color: "#A6A6A6",
                        fontWeight: "400",
                        fontSize: "12px",
                        fontFamily: "Avenir",
                      }}
                    >
                      has booked an appointment for the{" "}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "black",
                        fontFamily: "Avenir",
                      }}
                    >
                      {notif?.Appointment?.subService?.name}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      sx={{
                        color: "#A6A6A6",
                        fontWeight: "400",
                        fontSize: "12px",
                        fontFamily: "Avenir",
                      }}
                    >
                      on{" "}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "black",
                        fontFamily: "Avenir",
                      }}
                    >
                      {formatDateTime(notif?.Appointment?.startTime)}
                    </Typography>
                  </CustomTypography>

                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "400",
                      color: "#A6A6A6",
                      fontSize: "10px",
                      fontFamily: "Avenir",
                    }}
                  >
                    {formatRelativeTime(notif.createdAt)}
                    {/* {format(new Date(notif.createdAt), "hh:mm a")} */}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          : notifications.map((notif: any) => (
              <MenuItem
                key={notif.id}
                onClick={() => {
                  if (!notif.read) {
                    const markAsReadAction =
                      role === "Admin"
                        ? markAsReadAdminNotifications
                        : markAsReadDoctorNotifications;

                    dispatch(markAsReadAction({ notificationId: notif.id }))
                      .unwrap()
                      .then(() => {
                        setNotifications((prev) =>
                          prev.map((n) =>
                            n.id === notif.id ? { ...n, read: true } : n
                          )
                        );
                      })
                      .catch((error) =>
                        console.error(
                          "Failed to mark notification as read:",
                          error
                        )
                      );
                  }
                  handleNotificationClick(notif);
                }}
                sx={{
                  display: "block",
                  padding: "16px",
                  fontFamily: "Avenir",
                  height: "66px",
                  backgroundColor: notif.read ? "#F5F5F5" : "#FBC02D1F",
                  marginBottom: "8px",
                  "&:hover": {
                    backgroundColor: notif.read ? "#E0E0E0" : "#F0F0F0", // Adjust hover color
                    color: "inherit",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CustomTypography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "12px",
                        fontFamily: "Avenir",
                      }}
                    >
                      {" "}
                      {notif.type === "order"
                        ? notif.Orders?.customer_id?.name
                        : notif.Appointment?.patientId?.name}
                    </Typography>{" "}
                    <Typography
                      component="span"
                      sx={{
                        color: "#A6A6A6",
                        fontWeight: "400",
                        fontSize: "12px",
                        fontFamily: "Avenir",
                      }}
                    >
                      {notif.type === "order"
                        ? "has placed an order with ID "
                        : " has booked an appointment for the "}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "black",
                        fontFamily: "Avenir",
                      }}
                    >
                      {notif.type === "order"
                        ? notif.Orders?.unique_code
                        : notif.Appointment?.subService?.name}
                    </Typography>
                    {notif.type === "order" ? <br /> : ""}
                    <Typography
                      component="span"
                      sx={{
                        color: "#A6A6A6",
                        fontWeight: "400",
                        fontSize: "12px",
                        fontFamily: "Avenir",
                      }}
                    >
                      {" "}
                      on
                    </Typography>
                    {notif.type === "order" ? " " : <br />}
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "black",
                        fontFamily: "Avenir",
                      }}
                    >
                      {notif.type === "order"
                        ? `${formatDateTime(notif.Orders?.created_at)}.`
                        : formatDateTime(notif.Appointment?.startTime)}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "black",
                        fontFamily: "Avenir",
                      }}
                    >
                      {notif.type === "order"
                        ? ""
                        : `with ${notif.Appointment?.doctorId?.name}`}
                    </Typography>
                  </CustomTypography>
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "400",
                      color: "#A6A6A6",
                      fontSize: "10px",
                      fontFamily: "Avenir",
                    }}
                  >
                    {/* {notif.type === "order"
                      ? format(new Date(notif.createdAt), "hh:mm a")
                      : format(
                          new Date(notif.Appointment.createdAt),
                          "hh:mm a"
                        )} */}
                    {notif.type === "order"
                      ? formatRelativeTime(notif.createdAt)
                      : formatRelativeTime(notif.Appointment.createdAt)}
                  </Typography>
                </Box>
              </MenuItem>
            ))}

        {notifications?.length > 3 && (
          <>
            <Divider />
            <Box sx={{ textAlign: "center" }}>
              <Button variant="text" onClick={handleSeeAll}>
                <CustomTypography
                  sx={{
                    fontWeight: "500",
                    fontSize: "12px",
                    fontFamily: "Avenir",
                    lineHeight: "14px",
                  }}
                >
                  See All
                </CustomTypography>
              </Button>
            </Box>
          </>
        )}
      </Menu>

      <CustomModal
        open={isModalOpen}
        title={"Notification"}
        handleClose={handleModalClose}
        modalWidth="50%"
      >
        <NotificationModal
          handleClose={handleClose}
          selectedNotification={selectedNotification}
          handleModalClose={handleModalClose}
          role={role}
        />
      </CustomModal>
    </>
  );
};

export default Notifications;
