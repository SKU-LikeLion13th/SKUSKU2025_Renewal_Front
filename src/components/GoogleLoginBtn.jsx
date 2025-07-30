export default function GoogleLoginBtn({
  textColor = "text-black",
  bgColor = "bg-white",
  borderColor = "border-black",
  textSize = "text-[13px]",
}) {
  const handleLogin = () => {
    const currentPath = location.pathname + location.search;
    localStorage.setItem("redirectAfterLogin", currentPath);
    const origin = location.origin;
    const path = location.pathname + location.search;
    const fullRedirect = origin + path;
    const encodedRedirect = encodeURIComponent(fullRedirect);
    window.location.href = `https://backend.sku-sku.com/oauth2/authorization/google?state=${encodedRedirect}`;
  };

  return (
    <div
      className={`flex justify-center items-center px-4 py-2 rounded-sm cursor-pointer box-border border ${bgColor} ${textColor} ${borderColor}  hover:bg-white hover:text-black transition`}
      onClick={handleLogin}
    >
      <img
        src="/assets/images/googleLogin.png"
        alt=""
        width="16px"
        className="mr-2"
      />
      <p className={`${textSize}`}>구글계정으로 계속하기</p>
    </div>
  );
}
