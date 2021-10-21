import QRCode from "react-qr-code";

const migration = () => {

    const contentStyle = {
        fontFamily: 'sans-serif',
        textAlign: 'center',
      };

    return (
        <div style={contentStyle}>
            <h1>Oppss.. las tecnologias de TOC funcionan a traves de un movil</h1>
            <h2>Escanee el codigo QR para su uso adecuado</h2>
            <QRCode value="https://raul12382.github.io/mvp-react/" />
        </div>
    )
}

export default migration
