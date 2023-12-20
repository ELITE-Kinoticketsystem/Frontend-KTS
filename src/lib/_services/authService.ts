export class AuthService {

  public static async login(username: string, password: string) {
    const body = JSON.stringify({
      "username": username,
      "password": password
    });
    return await fetch(apiUrl + "/auth/login", {
      method : "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    });
  }

  public changePassword(oldPassword: string, newPassword: string): boolean {
    // Perform change password logic here
    return true; //Todo return if change password was successful
  }

  public resetPassword(email: string): boolean {
    // Perform reset password logic here
    return true; //Todo return if reset password was successful
  }

  public addAddress(address: string): boolean {
    // Perform add address logic here
    return true; //Todo return if add address insert was successful
  }

  public changeAddress(newAddress: string, password?: string): boolean {
    // Perform change address logic here
    return true; //Todo return if change address was successful
  }

  public logout(): void {
    // Perform logout logic here
    // ...
    // Set isLoggedIn to false if logout is successful
    //localStorage.removeItem('token');
  }

  public isUserLoggedIn(): boolean {
    return false;
  }

  public getUser(): string {
    // get UserData from backend
    return "user";
  }

  // Change to movie struct, json maybe?
  public async getForYouMovies() {
    // get movies from backend
    return ["movie1", "movie2", "movie3"];
  }

  public static async register(firstname: string, lastname: string, username: string, email: string, password: string)  {
    const body = JSON.stringify({
      "username": username,
      "email": email,
      "password": password,
      "firstname": firstname,
      "lastname": lastname
    });
    return await fetch(apiUrl + "/auth/register", {
      method : "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    });
  }
}
export const apiUrl = "https://cinemika.westeurope.cloudapp.azure.com:8080";
