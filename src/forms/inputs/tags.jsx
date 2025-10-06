import { Controller } from "react-hook-form";
import { Autocomplete, TextField, Chip } from "@mui/material";
/**
 * Autocomplete with list of tags present in backend with flexibility to add new tags on the fly (Can select multiple tags)
 */
const TagsInput = ({ control, tags }) => (
  <Controller
    name="tags"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Autocomplete
        multiple
        freeSolo
        options={tags.map((tag) => tag.name)}
        value={value || []}
        onChange={(_, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Tags" margin="normal" />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              sx={{ borderRadius: 0.5 }}
              variant="outlined"
              label={option}
              color="primary"
              {...getTagProps({ index })}
            />
          ))
        }
      />
    )}
  />
);

export default TagsInput;
