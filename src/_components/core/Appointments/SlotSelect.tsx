import React from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";

interface SlotSelectProps {
  title: string;
  placeholder: string;
  options: Array<{ id: string | number; displayTime: string }>;
  value: { id: string | number; displayTime: string } | null;
  onChange: (event: React.SyntheticEvent, newValue: any) => void;
  onBlur: (event: React.FocusEvent) => void;
  error?: boolean;
  helperText?: string;
}

const SlotSelect: React.FC<SlotSelectProps> = ({
  title,
  placeholder,
  options,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  return (
    <div>
      <Typography
        sx={{
          color: "#B2B2B2",
          fontFamily: "Avenir",
          fontSize: "12px",
          fontWeight: "400",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        {title}
      </Typography>
      <Autocomplete
        fullWidth
        options={options}
        getOptionLabel={(option) => option.displayTime}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            height: "40px",
          },
          "& .MuiInputBase-root": {
            padding: "8px 8px",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            error={error}
            helperText={helperText}
            InputLabelProps={{
              shrink: true,
              sx: {
                color: "#7B7B7B",
                fontSize: "14px",
                position: "absolute",
                left: "5%",
                transform: "translateY(-50%)",
                top: "50%",
                "&.Mui-focused": {
                  color: "#161616",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "40px",
                padding: "8px",
                "&:hover fieldset": {
                  borderColor: "#D7D7D7",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#D7D7D7",
                },
              },
              "& .MuiFormLabel-root": {
                color: value ? "#161616" : "#7B7B7B",
                fontSize: "14px",
              },
              "& .MuiInputBase-input": {
                fontSize: "13px",
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default SlotSelect;
