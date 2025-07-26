export default function GoogleLoginBtn({ isHovered }) {
  const handleLogin = () => {
    const currentPath = location.pathname + location.search;
    localStorage.setItem("redirectAfterLogin", currentPath);
    const isLocal = window.location.hostname === 'localhost';

    const frontendRedirectUri = isLocal
      ? 'http://localhost:5173/'
      : 'https://renewal.sku-sku.com/';

    window.location.href =
      `https://backend.sku-sku.com/oauth2/authorization/google?state=${encodeURIComponent(frontendRedirectUri)}`;

    };

  return (
    <div
      className={`flex items-center px-4 py-2 rounded-sm cursor-pointer box-border
      border ${
        isHovered
          ? "bg-white text-black border-black"
          : "border-transparent bg-white/50 text-white"
      }
      hover:bg-white hover:text-black transition`}
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