import React from "react";
import "./Publicacion.css";

class Publicacion extends React.Component {
  render() {
    return (
      <div className="Business">
        <div className="image-container">
          <img src={this.props.propiedades.idimagen} alt="Red dot" />
        </div>

        <h2>{this.props.propiedades.nombreproducto}</h2>

        <div className="Business-information">
          <div className="Business-address">
            <p>{this.props.propiedades.empresa}</p>
            <p>{this.props.propiedades.descripcion}</p>
            <p>{this.props.propiedades.ciudad}</p>
            <p>{this.props.propiedades.precio}</p>
          </div>
          <div className="Business-reviews"></div>
        </div>
      </div>
    );
  }
}

export default Publicacion;
