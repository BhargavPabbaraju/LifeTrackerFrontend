import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

/**
 * Autocomplete with list of domains present in backend with flexibility to add new domains on the fly (Can only select one domain)
 */
const DomainInput = ({ control, domains }) => (
  <Controller
    rules={{ required: "Domain is required" }}
    name="domain"
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <Autocomplete
        freeSolo
        options={domains.map((d) => d.name)}
        value={value || ""}
        onChange={(_, newValue) => onChange(newValue)}
        onInputChange={(_, newInput) => onChange(newInput)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Domain"
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    )}
  />
);

export default DomainInput;
