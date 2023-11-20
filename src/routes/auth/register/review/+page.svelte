<script lang="ts">
    import { browser } from "$app/environment";

    if (browser) {
        if (
            window.sessionStorage.getItem("fullname") === null ||
            window.sessionStorage.getItem("email") === null ||
            window.sessionStorage.getItem("password") === null ||
            window.sessionStorage.getItem("country") === null ||
            window.sessionStorage.getItem("city") === null ||
            window.sessionStorage.getItem("zipCode") === null ||
            window.sessionStorage.getItem("street") === null
        ) {
            window.location.href = "/auth/register/address";
        }
    }

    let fullname: string = "";
    let email: string = "";
    let password: string = "";
    let country: string = "";
    let city: string = "";
    let zipCode: string = "";
    let street: string = "";
    if (browser) {
        fullname = window.sessionStorage.getItem("fullname")!;
        email = window.sessionStorage.getItem("email")!;
        password = window.sessionStorage.getItem("password")!;
        country = window.sessionStorage.getItem("country")!;
        city = window.sessionStorage.getItem("city")!;
        zipCode = window.sessionStorage.getItem("zipCode")!;
        street = window.sessionStorage.getItem("street")!;
    }
    $: nextStep = () => {
        //send request to backend
        let data = {
            fullname: fullname,
            email: email,
            password: password,
            country: country,
            city: city,
            zipCode: zipCode,
            street: street,
        };
        let fail = !false;
        if (browser) {
            const sessionStorage = window.sessionStorage;
            sessionStorage.clear();
            window.location.href = "/?registerd=" + fail;
        }
    };
</script>

<div
    class="flex flex-col rounded-xl mx-auto w-full max-w-2xl justify-center bg-[#2A313A] bg-repeat-round pt-6 pb-6 pl-16 pr-16"
>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <p
            class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight duration-300 text-buttonBlue hover:text-textWhite"
        >
            CINEMIKA
        </p>
        <h2
            class="mt-8 mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-textWhite"
        >
            Register
        </h2>
    </div>
    <div class="rounded-lg mx-5">
        <div class="my-2 mx-2">
            <ol class="flex items-center w-full mb-4 ml-16 mt-2">
                <li
                    class="flex w-full items-center text-textWhite after:content-[''] after:w-full after:h-1 after:border-b after:border-green-700 after:border-4 after:inline-block"
                >
                    <div
                        class="flex items-center justify-center w-10 h-10 bg-green-700 rounded-full shrink-0"
                    >
                        <svg
                            class="w-4 h-4 text-textWhite lg:w-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 16"
                        >
                            <path
                                d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"
                            />
                        </svg>
                    </div>
                </li>
                <li
                    class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-green-700 after:border-4 after:inline-block"
                >
                    <div
                        class="flex items-center justify-center w-10 h-10 bg-green-700 rounded-full shrink-0"
                    >
                        <svg
                            class="w-4 h-4 text-textWhite lg:w-6 lg:h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 14"
                        >
                            <path
                                d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z"
                            />
                            <path
                                d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z"
                            />
                        </svg>
                    </div>
                </li>
                <li class="flex items-center w-full">
                    <div
                        class="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full shrink-0"
                    >
                        <svg
                            class="w-4 h-4 text-textWhite"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 20"
                        >
                            <path
                                d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"
                            />
                        </svg>
                    </div>
                </li>
            </ol>
            <form action="#">
                <h3
                    class="mb-4 text-lg underline underline-offset-2 font-bold leading-none text-textWhite"
                >
                    Review your data
                </h3>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label
                            for="fullname"
                            class="block mb-2 text-sm font-medium text-textWhite"
                            >Fullname</label
                        >
                        <input
                            type="text"
                            name="fullname"
                            id="fullname"
                            class="bg-inputBlue placeholder:text-textWhite border border-gray-300 text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={fullname}
                            disabled
                            required
                        />
                    </div>

                    <div>
                        <label
                            for="email"
                            class="block mb-2 text-sm font-medium text-textWhite"
                            >E-Mail</label
                        >
                        <input
                            type="email"
                            name="email"
                            id="email"
                            class="bg-inputBlue placeholder:text-textWhite border border-gray-300 text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={email}
                            disabled
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="password"
                            class="block mb-2 text-sm font-medium text-textWhite"
                            >Password</label
                        >
                        <input
                            type="password"
                            name="password"
                            id="password"
                            class="bg-inputBlue placeholder:text-textWhite border border-gray-300 text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={password}
                            disabled
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="country"
                            class="block mb-2 text-sm font-medium text-textWhite"
                            >Country</label
                        >
                        <input
                            type="text"
                            name="country"
                            id="country"
                            class="bg-inputBlue placeholder:text-textWhite border border-gray-300 text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={country}
                            disabled
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="city"
                            class="block mb-2 text-sm font-medium text-textWhite"
                            >Zipcode + City</label
                        >
                        <input
                            type="text"
                            name="city"
                            id="city"
                            class="bg-inputBlue placeholder:text-textWhite border border-gray-300 text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={zipCode + " " + city}
                            disabled
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="street"
                            class="block mb-2 text-sm font-medium text-textWhite"
                            >Street + Housenumber</label
                        >
                        <input
                            type="text"
                            name="street"
                            id="street"
                            class="bg-inputBlue placeholder:text-textWhite border border-gray-300 text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={street}
                            disabled
                            required
                        />
                    </div>
                    <button
                        id="submit-button"
                        type="button"
                        on:click={nextStep}
                        class="text-textWhite bg-buttonBlue duration-300 disabled:hover:bg-red-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Next Step: Create account
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
