import React from "react";
import { Typography, Box, TextField, Autocomplete } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Define a generic Option interface to allow flexibility in the data passed to SingleSelect
interface Option {
  id?: any;
  name?: any;
}

interface SingleSelectProps {
  typo?: string;
  title?: string;
  data: Option[];
  textFieldLabel?: string;
  onChange: (newValue: Option | null) => void;
  onClick?: () => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // Add onBlur here
  name: string;
  value: Option | null;
  add?: boolean;
  disabled?: boolean;
  sx?: object;
  titleStyle?: object;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  typo,
  title,
  data,
  textFieldLabel,
  onChange,
  onClick,
  onBlur,
  name,
  value,
  add = false,
  disabled = false,
  sx,
  titleStyle,
}) => {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
    >
      <Grid size={{ xs: 12, md: 12 }} component="div">
        <Typography
          sx={{
            color: "#B2B2B2",
            fontFamily: "Avenir",
            fontSize: "12px",
            fontWeight: "400",
            marginTop: "5px",
            marginBottom: "5px",
            ...titleStyle,
          }}
        >
          {title}
        </Typography>

        <Autocomplete
          id={name}
          options={data}
          value={value}
          disabled={disabled}
          key={name}
          noOptionsText={"No Options"}
          onChange={(event, newValue) => onChange(newValue)}
          // isOptionEqualToValue={(option, value) => option.id === value?.id}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          // isOptionEqualToValue={(option, value) => option.id === value?.id || option.name === value?.name}

          autoHighlight
          getOptionLabel={(option) => option?.name || ""} // Default to `name` key
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              height: "40px",
              ...sx,
            },
            "& .MuiInputBase-root": {
              padding: "8px 8px", // Adjust the padding here as needed
            },
          }}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              {option?.name || ""}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              name={name}
              onBlur={onBlur}
              placeholder={typo ? typo : textFieldLabel}
              label={typo ? typo : ""}
              InputLabelProps={{
                shrink: typo ? undefined : Boolean(value),
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
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              sx={{
                ...(textFieldLabel && {
                  "& .MuiFormLabel-root": {
                    color: "#161616", // Custom label color
                    fontSize: "13px", // Adjust font size
                  },
                }),
                "& .MuiFormLabel-root": {
                  color: value ? "#161616" : "#7B7B7B",
                  fontSize: "14px", // Adjust font size
                },

                // Adjust the size of the input field
                "& .MuiInputBase-root": {
                  padding: "4px 8px", // Custom padding for input
                  "&:hover fieldset": {
                    borderColor: "#D7D7D7", // Change hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#D7D7D7",
                  },
                },

                // You can also adjust the font size here if needed
                "& .MuiInputBase-input": {
                  fontSize: "13px", // Reduce font size
                },
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default SingleSelect;
