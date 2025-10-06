import { Card, CardContent, Typography } from "@mui/material";

export default function CardPanel({ title, children, sx }) {
  return (
    <Card sx={{ mb: 2, ...sx }}>
      {title && (
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h6">{title}</Typography>
        </CardContent>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
