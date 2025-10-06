import React, { useEffect, useState } from "react";
import api from "../api";
import CardPanel from "../components/ui/CardPanel";
import {
  Divider,
  ListItem,
  ListItemText,
  Typography,
  List,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function DomainsPage() {
  const [domains, setDomains] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    api
      .get("domains/")
      .then((res) => setDomains(res.data))
      .catch((err) => console.error("Error fetching domains " + err));
  }, []);

  return (
    <CardPanel
      sx={{
        backgroundColor: theme.palette.surface,
        color: theme.palette.onSurface,
      }}
    >
      {domains.length === 0 ? (
        <Typography> No domains found. </Typography>
      ) : (
        <List>
          {domains.map((d) => (
            <React.Fragment key={d.id}>
              <ListItem
                sx={{
                  backgroundColor: theme.palette.primary.container,
                  color: theme.palette.primary.onContainer,
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.conContainer,
                      }}
                    >
                      {d.name}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </CardPanel>
  );
}
