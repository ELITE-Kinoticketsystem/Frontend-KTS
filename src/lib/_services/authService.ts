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

  public static async isUserLoggedIn(): Promise<boolean> {
    return new Promise(async (resolve) => {
      await fetch(apiUrl + "/auth/logged-in", {
      method : "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => {
      response.json().then(data => {
        resolve(data.loggedIn);
      });
    });
  });
  }
  public static async getUserData(): Promise<any> {
    return new Promise(async (resolve) => {
      await fetch(apiUrl + "/users/get-me", {
      method : "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => {
      response.json().then(data => {
        resolve(data);
      });
    });
  });
  }

  public static async isAdmin(): Promise<Boolean> {
    return new Promise(async (resolve) => {
      await fetch(apiUrl + "/auth/is-admin", {
      method : "GET",
      credentials: "include",
      }).then(async response => {
        if(response.status !== 200) {
          resolve(false);
          return false;
        }
        await response.json().then(data => {
          resolve(data);
        });
      });
    });
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
export const apiUrl = "https://cinemika.germanywestcentral.cloudapp.azure.com:8080";