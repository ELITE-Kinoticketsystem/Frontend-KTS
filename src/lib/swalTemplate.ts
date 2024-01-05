import Swal from "sweetalert2";

export function fire(
  content: string,
  timer: number = 0,
  showCanc: boolean = false,
  showConf: boolean = false
) {
  let POPUP = "bg-tileBlue text-textWhite rounded-lg mt-12";
  if (timer > 0) {
    Swal.fire({
      position: "top",
      title: content,
      showCancelButton: showCanc,
      showConfirmButton: showConf,
      timer: timer,
      timerProgressBar: true,
      customClass: {
        popup: POPUP,
      },
    });
  } else {
    Swal.fire({
      position: "top",
      title: content,
      showCancelButton: showCanc,
      showConfirmButton: showConf,
      customClass: {
        popup: POPUP,
      },
    });
  }
}
