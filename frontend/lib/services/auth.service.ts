import { jwtDecode } from "jwt-decode";
import api from "@/lib/axios";
import type {
  LoginUserDto,
  AuthResponse,
  UserDto,
  RegisterUserDto,
  ChangeMdpDto,
  JwtPayload,
} from "@/lib/types/auth";

// Fonction utilitaire pour décoder le token JWT
const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return null;
  }
};

// Fonction pour obtenir le payload du token actuel
const getTokenPayload = (): JwtPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return decodeToken(token);
};

export const authService = {
  async login(credentials: LoginUserDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(userData: RegisterUserDto): Promise<any> {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  async changePassword(changeMdpData: ChangeMdpDto): Promise<any> {
    const response = await api.post("/auth/change", changeMdpData);
    return response.data;
  },

  async users(): Promise<UserDto[]> {
    const response = await api.get<UserDto[]>("/auth/users", {});
    return response.data;
  },

  logout(): void {
    localStorage.removeItem("token");
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  getUserName(): string | null {
    const payload = getTokenPayload();
    return payload?.userName || payload?.sub || null;
  },

  getRole(): string | null {
    const payload = getTokenPayload();
    return payload?.role || null;
  },

  getFirstLogin(): boolean {
    const payload = getTokenPayload();
    return payload?.firstLogin === true;
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Vérifier si le token est expiré
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return true; // Si pas d'expiration, considérer comme valide

    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  },

  saveAuthData(authResponse: AuthResponse): void {
    // On stocke seulement le token, les autres infos seront lues depuis le JWT
    localStorage.setItem("token", authResponse.token);
  },
};
