import "../Componentes/stylesheets/footer.css";

const Footer = () => {
  return (
    <div
      className="bg-dark fixed-bottom footer"
      style={{ position: "relative", bottom: 0 }}
    >
      <footer>
        <h6>Todos los derechos reservados - 2025</h6>
      </footer>
    </div>
  );
};

export default Footer;
