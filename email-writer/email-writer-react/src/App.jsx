import { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        { emailContent, tone }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("⚠️ Failed to generate email reply. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          color: "white",
          py: 10,
          px: 2,
          background: "rgba(0,0,0,0.2)", // light overlay
          backdropFilter: "blur(2px)",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            letterSpacing: 2,
            textShadow: "0px 4px 15px rgba(0,0,0,0.7)",
          }}
        >
          MailGenie ✨
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            opacity: 0.9,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Your AI-powered assistant for effortless email replies
        </Typography>
      </Box>

      {/* Email Form Section */}
      <Container maxWidth="md" sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            p: 5,
            mt: -6,
            borderRadius: "25px",
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
            color: "white",
            transition: "transform 0.4s ease",
            "&:hover": { transform: "scale(1.02)" },
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{
              mb: 3,
              background: "rgba(255,255,255,0.08)",
              borderRadius: "12px",
              textarea: { color: "white" },
              label: { color: "white" },
            }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel sx={{ color: "white" }}>Tone (Optional)</InputLabel>
            <Select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              sx={{
                borderRadius: "12px",
                color: "white",
                ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "14px",
              fontSize: "1rem",
              background: "linear-gradient(90deg, #ff9966, #ff5e62)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
              "&:hover": {
                background: "linear-gradient(90deg, #ff5e62, #ff9966)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Generate Reply"
            )}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 3, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        {generatedReply && (
          <Box
            sx={{
              mt: 5,
              p: 4,
              borderRadius: "25px",
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
              Generated Reply
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={generatedReply}
              inputProps={{ readOnly: true }}
              sx={{
                mb: 3,
                background: "rgba(255,255,255,0.08)",
                borderRadius: "12px",
                textarea: { color: "white" },
              }}
            />

            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "14px",
                color: "white",
                borderColor: "white",
                "&:hover": {
                  background: "rgba(255,255,255,0.15)",
                },
              }}
              onClick={() => navigator.clipboard.writeText(generatedReply)}
            >
              Copy to Clipboard
            </Button>
          </Box>
        )}
      </Container>

      {/* Features Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          color: "white",
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Features
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            maxWidth: "900px",
            mx: "auto",
          }}
        >
          {[
            "Generate replies with different tones",
            "Copy replies instantly",
            "Modern glassmorphic UI",
            "Free and easy to use",
          ].map((feature, i) => (
            <Box
              key={i}
              sx={{
                p: 4,
                borderRadius: "18px",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              <Typography variant="h6">{feature}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 3,
          color: "white",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(5px)",
          fontSize: "0.9rem",
        }}
      >
        © {new Date().getFullYear()} MailGenie — Designed for effortless email writing.
      </Box>
    </Box>
  );
}

export default App;
