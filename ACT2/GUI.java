import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class GUI extends JFrame
 {

    JPanel pBotones; // panel de los botones
    JButton BReglamento, BLineamientos, BFechas, BPorcentajes; //  declaracion de bootnes
    JTextArea area; // lugar en donde se va a poner el texto de los métodos
    inicioPAM inicio; // objeto de la clase inicioPAM

    public GUI() 
    {
        inicio = new inicioPAM(); // creación del objeto
        // botones con sus respectivos textos (lo que va a decir el boton)
        BReglamento = new JButton("Reglamento POO");
        BLineamientos = new JButton("Lineamientos");
        BFechas = new JButton("Fechas Parciales");
        BPorcentajes = new JButton("Porcentajes");

     // agregamos los botones al panel
        pBotones = new JPanel();
        pBotones.add(BReglamento);
        pBotones.add(BLineamientos);
        pBotones.add(BFechas);
        pBotones.add(BPorcentajes);

      // en donde se va a poner el texto(el tamaño)
        area = new JTextArea(15, 40);
        area.setEditable(false);

       // división de los botones 
        setLayout(new BorderLayout());
        add(pBotones, BorderLayout.NORTH);
        add(area, BorderLayout.CENTER); 

      // les ponemos a los botones funcionalidad 
        BReglamento.addActionListener(new ActionListener() 
        {
            public void actionPerformed(ActionEvent e) 
            {
                area.setText(inicio.reglamentoPoo());
            }
        });

        BLineamientos.addActionListener(new ActionListener() 
        {
            public void actionPerformed(ActionEvent e) 
            {
                area.setText(inicio.lineamientosClassroom());
            }
        });

        BFechas.addActionListener(new ActionListener() 
        {
            public void actionPerformed(ActionEvent e) 
            {
                area.setText(inicio.fechasParciales());
            }
        });

        BPorcentajes.addActionListener(new ActionListener() 
        {
            public void actionPerformed(ActionEvent e) 
            {
                area.setText(inicio.porcentajesPorParcial());
            }
        });

   // Configuración de la ventana (nombre,tamaño, que sea visible)
        setTitle("Actividad 2");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1080, 700); // Tamaño manual
        setVisible(true);
    }
    
 // método principal en donde se manda a llamar a GUI
    public static void main(String[] args) 
    {
        new GUI();
    }
}
