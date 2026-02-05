import { app } from './app';
import { env } from './config/env';

// Iniciar Servidor
const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`👉 http://localhost:${PORT}/api/health`);
});
