import React, { useEffect } from "react";
import cx from "clsx";
import NoSsr from "@material-ui/core/NoSsr";
import GoogleFontLoader from "react-google-font-loader";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Typography } from "@material-ui/core";
import {
  useButtonStyles,
  useStyles,
  useStylesCard,
} from "./styleMiddlePolitics";
import useForceUpdate from "use-force-update";
import FormatoPublicar from "./formatoPublicar";
import usuarios from "../../util/GETTOK";
import estadoPublicacion from "../../util/POSTTOK";

import Zoom from "@material-ui/core/Zoom";

export default function MiddlePolitics() {
  const styles = useStyles();
  const btnStyles = useButtonStyles();
  const classes = useStylesCard();
  const [state, setState] = React.useState(false),
    [loading, setLoading] = React.useState(true),
    [checked, setChecked] = React.useState(true);
  useEffect(() => {
    getData();
  }, [!state]);
  const forceUpdate = useForceUpdate();
  const getData = async () => {
    const url = `/getPersonas/${localStorage.getItem("id")}`;
    await usuarios(url).then((response) => {
      console.log(response.estado);
      if (response.estado === "Por_Revisar") {
        setState(true);
        setLoading(false);
      } else {
        setState(false);
        setLoading(false);
      }
    });
  };
  const setUpdateUser = async () => {
    const url = "/actualizarusuario";
    const data = JSON.stringify({
      estado: "Usuario_Habilitado",
      _id: localStorage.getItem("id"),
      
    });
    setChecked(false);
    setTimeout(async() => {
      await estadoPublicacion(data, url).then((response) => {
        if (response) {
          getData();
          setChecked(true)
        } else {
          setChecked(true)
        }
      });
    }, 200);
   
    
 
  }
  const handleChange = () => {
    
   
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  } else {
    if (state) {
      return (
        <div className={classes.container}>
          <Zoom
            in={checked}
            style={{ transitionDelay: checked ? "200ms" : "0ms" }}
          >
            <div>
              <NoSsr>
                <GoogleFontLoader
                  fonts={[{ font: "Kanit", weights: [400, 700] }]}
                />
              </NoSsr>
              <Box maxWidth="100%">
                <Column p={0} gap={3} className={styles.card}>
                  <Item>
                    <h2 className={cx(styles.titleFont, styles.header)}>
                      Política de contenido para las publicaciones en Software
                      Market
                    </h2>
                  </Item>
                  <Item
                    py={1}
                    bgcolor={"rgb(255, 189, 128)"}
                    className={cx(styles.titleFont, styles.ribbon)}
                  >
                    22 de Julio de 2021
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      Las publicaciones de SoftwareMarket te permiten compartir
                      información relevante y oportuna directamente con los
                      clientes. Las siguientes políticas ayudan a garantizar que
                      el contenido publicado, incluidos los textos y las fotos ,
                      cree una experiencia positiva para los clientes. Eres
                      responsable de asegurarte de que el contenido que
                      publiques satisfaga todas las leyes y normas aplicables.
                      Dado que modificamos estas políticas de vez en cuando,
                      recomendamos consultarlas para comprobar si hay
                      actualizaciones. Proporcionaremos avisos sobre dichos
                      cambios si así lo requiere la ley aplicable
                    </Box>
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Contenido irrelevante
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      Cuando un autor publica en nombre de una empresa, su
                      contenido publicado debe ser relevante para ella y ayudar
                      a los clientes a conocerla mejor. No se permite contenido
                      irrelevante para la empresa o que no esté asociado a ella
                      de forma clara. Consulta nuestros Lineamientos sobre la
                      representación de tu empresa en SoftwareMarket.
                      SoftwareMarket no está diseñado para ser un foro de
                      comentarios políticos, sociales o personales. Se quitará
                      el contenido que no cumpla con estos lineamientos
                    </Box>
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Spam
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      El contenido que se publica en este servicio no debe
                      engañar a tus clientes, y la información que se presenta
                      debe ser clara y honesta. A continuación, se brindan
                      ejemplos de contenido que no está permitido: Errores de
                      ortografía, uso efectista de caracteres o contenido
                      irrelevante, automático o que genere distracción (como
                      calidad de imagen o o deficiente, o bien contenido
                      irreconocible) Imágenes, vínculos que tengan un impacto
                      negativo en la atención del lector Vínculos a software
                      maliciosos, virus o algún otro software dañino Vínculos a
                      sitios irrelevantes para la empresa Estafas para la
                      suplantación de identidad (phishing)
                    </Box>
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Contenido inapropiado
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      Este servicio no permite lo siguiente: Contenido que
                      propicie el acoso, el bullying o que incite al odio.El
                      contenido publicado no puede fomentar el odio o la
                      violencia contra personas o grupos debido a su origen
                      étnico, religión, discapacidad, sexo, edad, condición de
                      veterano, orientación sexual o identidad de género. El
                      texto, las imágenes, los videos o los vínculos no pueden
                      incluir insultos o epítetos peyorativos contra grupos
                      protegidos. El contenido no puede utilizarse para hostigar
                      o acosar a las personas. Esto incluye las amenazas físicas
                      directas o la revelación de información privada que pueda
                      usarse para llevar a cabo amenazas implícitas Contenido
                      despectivo sobre una persona, lugar o cosa que podría
                      molestar o hacer enojar al lector o al oyente Contenido
                      que incluya vocabulario o gestos obscenos, ofensivos o
                      vulgares Contenido que fomente o promueva la violencia o
                      que muestre de forma gráfica lesiones, abuso a personas o
                      animales, o bien actos violentos.Tampoco se permite el
                      contenido que pueda ofender o escandalizar a los usuarios
                      Contenido sexual explícito o provocativo.Las imágenes que
                      se publican en este servicio no deben incluir imágenes de
                      desnudos o actos sexuales. El contenido no puede incluir
                      lenguaje obsceno o vulgar que sea ofensivo y sexualmente
                      gráfico, términos que hagan referencia a la pedofilia,
                      contenido que fomente la pedofilia, zoofilia, violencia
                      sexual o contenido que promocione los servicios de
                      acompañantes o algún otro servicio que pueda interpretarse
                      como la oferta de actos sexuales a cambio de alguna forma
                      de remuneración. No se permiten los vínculos a contenido
                      para adultos.
                    </Box>
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Privacidad
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      La privacidad de nuestros usuarios es de suma importancia
                      para SoftwareMarket. Si bien nos complace que aportes
                      contenido que representa tu mundo, es fundamental que lo
                      hagas de una manera que respete las preferencias de
                      privacidad de los demás usuarios. Importante:No se permite
                      el contenido que incluya información privada o
                      confidencial, como la siguiente: Información financiera
                      personal Identificaciones emitidas por el Gobierno
                      Información de contacto vinculada o asociada a un nombre
                      Imágenes o registros sensibles Transcripciones o vínculos
                      que contengan información persona{" "}
                    </Box>
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Lineamientos para las fotos y los videos
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      No debes publicar fotos o videos tomados desde lugares
                      donde no puedan tomarse fotos. No debes publicar fotos o
                      videos de ubicaciones privadas o inaccesibles para el
                      público general sin el consentimiento del propietario.
                      Respeta a los demás y no publiques fotos o videos en los
                      que se pueda identificar a las personas sin su permiso.
                      Esto es particularmente importante en ubicaciones
                      confidenciales, donde es posible que las personas se
                      opongan a la publicación de su imagen. Solo se permite la
                      representación accesoria de bienes regulados. Contenido
                      permitido (representación accesoria):Una imagen que
                      muestre tu negocio con clientes en el fondo tomando una
                      copa de vino Puedes hacer reclamos relacionados con la
                      privacidad, excepto por los puntos enumerados en esta
                      sección, en la pestaña Deninciar publicación.
                    </Box>{" "}
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Inclusión del número de teléfono
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      Para evitar el riesgo de abusos, no permitimos que el
                      contenido de tu publicación incluya un número de teléfono.
                      Puedes colocar tu número en tu Perfil de negocio o en el
                      sitio web.
                    </Box>{" "}
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Contenido regulado o ilegal Contenido prohibido
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      No permitimos el contenido relacionado con productos y
                      servicios regulados, como alcohol, productos derivados del
                      tabaco, juegos de apuestas, servicios financieros,
                      productos farmacéuticos y suplementos, o dispositivos de
                      salud o médicos sin aprobación. No se permite el contenido
                      relacionado con la venta de productos peligrosos o
                      ilegales, y los servicios o actividades que causen daños,
                      perjuicios o lesiones. Los ejemplos incluyen drogas
                      recreativas, armas, fuegos artificiales o instrucciones
                      para hacer explosivos, así como instrucciones detalladas
                      que fomenten o indiquen cómo realizar una actividad
                      criminal que pueda generar un daño real.
                    </Box>
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Explotación infantil
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      No subas ni compartas contenido relacionado con la
                      explotación infantil o el abuso de menores, incluidas
                      todas las imágenes de abuso sexual de menores (aun cuando
                      sean imágenes de dibujos animados) y todo contenido en el
                      que aparezcan menores en contextos sexuales. Quitaremos
                      este tipo de contenido y emprenderemos las medidas
                      necesarias, como la inhabilitación de cuentas, la denuncia
                      a la fiscal de turno.
                    </Box>
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Contenido relacionado con el terrorismo
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      No permitimos que organizaciones terroristas utilicen este
                      servicio para ningún propósito, incluido el reclutamiento.
                      También prohibimos estrictamente la publicación de
                      contenido relacionado con el terrorismo, como aquel que
                      fomente actos terroristas, incite a la violencia o celebre
                      los ataques terroristas. Si una empresa publica contenido
                      relacionado con el terrorismo para fines educativos,
                      documentales, científicos o artísticos, debe brindar la
                      información suficiente para que los usuarios entiendan el
                      contexto.
                    </Box>
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Tergiversación y afirmaciones engañosas
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      No robes la identidad de una organización o individuo. No
                      realices afirmaciones falsas acerca de tu identidad o
                      calificaciones, como afirmar falsamente que eres un
                      representante autorizado de una empresa.
                    </Box>
                  </Item>
                  <Item>
                    <h3 className={cx(styles.titleFont, styles.header)}>
                      Lineamientos para la representación de tu empresa en
                      SoftwareMarket.
                    </h3>
                  </Item>
                  <Item>
                    <Box px={1} mt={1} className={cx(styles.titleFont)}>
                      No brindes información imprecisa que omita o confunda al
                      cliente sobre cómo se le cobrará o facturará.Lineamientos
                      para la representación de tu empresa en SoftwareMarket
                      Resumen:Solo es posible crear Perfiles de negocio en
                      SoftwareMarket para aquellas empresas que cuentan con una
                      ubicación física que los clientes pueden visitar o que se
                      trasladan hasta el lugar donde se encuentran los clientes.
                      Para crear Perfiles de negocio correctos y que no se
                      suspendan, debes evitar el contenido prohibido, mostrar tu
                      empresa tal cual es y satisfacer el resto de las políticas
                      que se detallan a continuación. Preparamos una lista de
                      lineamientos para que las empresas locales mantengan un
                      alto nivel de calidad en cuanto a la información que
                      publican en SoftwareMarket. El cumplimiento de estas
                      normas ayuda a evitar problemas comunes, como cambios en
                      la información o, en algunos casos, la eliminación de la
                      información de la empresa de SoftwareMarket. Para lograr
                      los mejores resultados en SoftwareMarket, ten en cuenta lo
                      siguiente: Representa a tu empresa de forma consecuente a
                      la personería presentada y reconocida en el mundo real
                      mediante la señalización, los papeles corporativos y otros
                      elementos de desarrollo de la marca. Asegúrate de que tu
                      dirección o área de servicio sean correctas y precisas.
                      Elige la menor cantidad posible de categorías para
                      describir la actividad comercial principal de la manera
                      más general. Solo debería haber un perfil por empresa, ya
                      que podría causar problemas con la forma en que tu
                      información aparece en SoftwareMarket y la Búsqueda. Las
                      marcas, organizaciones, artistas y otras empresas que solo
                      tienen presencia en línea no son aptos para tener una
                      ficha de SoftwareMarket.
                    </Box>
                  </Item>

                  <Row wrap gap={1} px={2} pb={2}>
                    <Item grow>
                      <Button
                        classes={btnStyles}
                        variant={"contained"}
                        color={"primary"}
                        onClick={setUpdateUser}
                        fullWidth
                      >
                        Aceptar Términos y Condiciones.
                      </Button>
                    </Item>
                  </Row>
                </Column>
              </Box>
            </div>
          </Zoom>
        </div>
      );
    } else {
      return (
 
        <div >
          <Zoom
            in={checked}
            style={{ transitionDelay: checked ? "200ms" : "0ms" }}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <div > <FormatoPublicar /></div>
           
          </Zoom>
        </div>
      );
    }
  }
}
