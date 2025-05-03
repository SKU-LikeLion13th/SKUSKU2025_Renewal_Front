export default function GoogleLoginBtn({ isHovered }) {
  const handleLogin = () => {
    const currentPath = location.pathname + location.search;
    localStorage.setItem("redirectAfterLogin", currentPath);
    window.location.href =
      "https://backend.sku-sku.com/oauth2/authorization/google";
  };

  return (
    <div
      className={`flex items-center px-4 py-2 rounded-sm cursor-pointer
          ${isHovered ? "bg-white text-black border" : "bg-white/50 text-white"}
          hover:bg-white  hover:text-black transition`}
      onClick={handleLogin}
    >
      <img
        src="/assets/images/googleLogin.png"
        alt=""
        width="16px"
        className="mr-2"
      />
      <p className="text-[13px]">구글계정으로 계속하기</p>
    </div>
  );
}
