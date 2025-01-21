import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";

interface Appointment {
  patientId: {
    name: string;
  };
  doctorId: {
    name: string;
  };
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: string;
  TotalFee: number;
}

interface Order {
  unique_code: string;
  id: number;
  customer_id: {
    name: string;
  };
  price: number;
  totalPrice: number;
  status: string;

  orderItems: Array<{
    id: string;
    itemId: string;
    quantity: number;
    price: number;
  }>;
}

interface NotificationModalProps {
  selectedNotification: {
    doctorId: any;
    scheduledDate: string | number | Date;
    startTime: string | number | Date;
    endTime: string | number | Date;
    status: any;
    TotalFee: any;
    patientId: any;
    title: string;
    body: string;
    type: string;
    Appointment?: Appointment;
    Orders?: Order;
  } | null;
  handleModalClose: () => void;
  handleClose?: () => void;
  role?: string | null;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  selectedNotification,
  handleModalClose,
  handleClose = () => {},
  role,
}) => {
  console.log("selectedNotification", selectedNotification);
  let type = selectedNotification?.type;

  return (
    <Box sx={{ padding: "8px 16px" }}>
      {selectedNotification ? (
        role === "Doctor" ? (
          <>
            {selectedNotification && (
              <Box>
                <Typography
                  fontFamily="var(--font-avenir)"
                  sx={{
                    fontSize: "14px",
                    marginBottom: "16px",
                    lineHeight: "16px",
                    color: "#161616",
                  }}
                >
                  Appointment Details:
                </Typography>

                {selectedNotification?.Appointment && (
                  <>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Patient:
                      </span>
                      {selectedNotification?.Appointment.patientId.name}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Doctor:
                      </span>
                      {selectedNotification?.Appointment.doctorId.name}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Date:
                      </span>
                      {format(
                        new Date(
                          selectedNotification?.Appointment.scheduledDate
                        ),
                        "MM/dd/yyyy"
                      )}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Time:
                      </span>
                      {`${format(
                        new Date(selectedNotification?.Appointment.startTime),
                        "h:mm a"
                      )} - ${format(
                        new Date(selectedNotification?.Appointment.endTime),
                        "h:mm a"
                      )}`}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Status:
                      </span>
                      {selectedNotification?.Appointment.status}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Total Fee:
                      </span>
                      {selectedNotification?.Appointment?.TotalFee}
                    </Typography>
                  </>
                )}
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: "14px !important",
                  fontWeight: "700 !important",
                  fontFamily: "Avenir !important",
                  lineHeight: "18px !important",
                  width: "100px !important",
                  borderRadius: "5px !important",
                  backgroundColor: "#FBC02D !important",
                  boxShadow: "none",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#FBC02D !important",
                    color: "white !important",
                    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05)",
                    transform: "scale(1.005)",
                  },
                }}
                onClick={handleModalClose}
              >
                Okay
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography
              fontFamily="var(--font-avenir)"
              sx={{
                fontSize: "14px",
                marginBottom: "16px",
                lineHeight: "16px",
                color: "#161616",
              }}
            >
              {selectedNotification.title}
            </Typography>
            <Typography
              fontFamily="var(--font-avenir)"
              sx={{
                fontSize: "12px",
                marginBottom: "16px",
                lineHeight: "16px",
                color: "#7B7B7B",
              }}
            >
              {selectedNotification.body}
            </Typography>

            {type === "order"
              ? selectedNotification.Orders && (
                  <Box>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "14px",
                        marginBottom: "16px",
                        lineHeight: "16px",
                        color: "#161616",
                      }}
                    >
                      Order Details:
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Customer:
                      </span>
                      {selectedNotification.Orders.customer_id.name}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Order ID:
                      </span>
                      {selectedNotification.Orders.unique_code}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Total Price:
                      </span>
                      {selectedNotification.Orders.totalPrice} SAR
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Status:
                      </span>
                      {selectedNotification.Orders.status}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Total Items:
                      </span>
                      {selectedNotification.Orders?.orderItems?.length}
                      {/* {selectedNotification.Orders.orderItems.map((item) => (
                    <Typography
                      key={item.id}
                      fontFamily="var(--font-avenir)"
                      sx={{ fontSize: "12px", marginBottom: "8px" }}
                    >
                      {`- ${item.quantity} x Item ${item.itemId} @ ${item.price}`}
                    </Typography>
                  ))} */}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Order Details:
                      </span>
                      <Link
                        onClick={() => {
                          handleClose(), handleModalClose();
                        }}
                        href={`/pharmacy/order-details/${selectedNotification.Orders.id}`}
                        style={{ fontFamily: "var(--font-avenirLight)" }}
                      >
                        View Full Order
                      </Link>
                    </Typography>
                  </Box>
                )
              : selectedNotification.Appointment && (
                  <Box>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "14px",
                        marginBottom: "16px",
                        lineHeight: "16px",
                        color: "#161616",
                      }}
                    >
                      Appointment Details:
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Patient:
                      </span>
                      {selectedNotification.Appointment.patientId.name}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Doctor:
                      </span>
                      {selectedNotification.Appointment.doctorId.name}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Date:
                      </span>
                      {format(
                        new Date(
                          selectedNotification.Appointment.scheduledDate
                        ),
                        "MM/dd/yyyy"
                      )}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Time:
                      </span>
                      {`${format(
                        new Date(selectedNotification.Appointment.startTime),
                        "h:mm a"
                      )} - ${format(
                        new Date(selectedNotification.Appointment.endTime),
                        "h:mm a"
                      )}`}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Status:
                      </span>
                      {selectedNotification.Appointment.status}
                    </Typography>
                    <Typography
                      fontFamily="var(--font-avenir)"
                      sx={{
                        fontSize: "12px",
                        marginBottom: "8px",
                        lineHeight: "16px",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: "110px",
                          color: "#7B7B7B",
                        }}
                      >
                        Total Fee:
                      </span>
                      {selectedNotification.Appointment.TotalFee}
                    </Typography>
                  </Box>
                )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: "14px !important",
                  fontWeight: "700 !important",
                  fontFamily: "Avenir !important",
                  lineHeight: "18px !important",
                  width: "100px !important",
                  borderRadius: "5px !important",
                  backgroundColor: "#FBC02D !important",
                  boxShadow: "none",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#FBC02D !important",
                    color: "white !important",
                    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05)",
                    transform: "scale(1.005)",
                  },
                }}
                onClick={handleModalClose}
              >
                Okay
              </Button>
            </Box>
          </>
        )
      ) : (
        <Typography variant="body1">No details available.</Typography>
      )}
    </Box>
  );
};

export default NotificationModal;
