import { browser } from "$app/environment";

export class AuthService {
  private isLoggedIn: boolean = true;

  public login(username: string, password: string): boolean {
    // Perform login logic here
    // ...
    // Set isLoggedIn to true if login was successful
    this.isLoggedIn = true;
    return true; //TODO return if login was successful
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
    this.isLoggedIn = false;
    //localStorage.removeItem('token');
  }

  public isUserLoggedIn(): boolean {
    return this.isLoggedIn;
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

  public static register(username: string, email: string, profilPicture?: string, password?: string, repeatPassword?: string): boolean {
    // Perform register logic here
    // ... 
    
    return true; //Todo return if register was successful
  }
}