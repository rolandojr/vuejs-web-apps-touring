var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    codigo: null,
    sexo: null,
    estado: '',
    direccion: null,
    fecha_nacimiento: null,
    lugar_nacimiento: null,
    edad: null,
    brevete: '',
    categoria_brevete: null,
    telefono: null,
    tiene_hijos: '',
    numero_hijos: null,
    vive_actualmente: null,
    estudios_realizados: [{
      nivel: '',
      nombreInstitucion: '',
      anioIngresoWithoutFormat: '',
      anioIngreso:'',
      gradoObtenido: '',
      situacion: ''
    }],
    otros_estudios_realizados: [{
      idioma: '',
      nivel: '',
      ms_office: '',
      nivel_ms_office: ''
    }],
    cargo_actual:null,
    area:'',
    tiempo_laborando: null,
    cargo_anterior: null,
    sentir_labor: null,
    motivo_postular: null,
    jefe_inmediato: null,
    relacion_compañeros: null,
    caracteristicas_personales: null,
    habilidades_personales: null,
    errors: {
      codigo: null
    },
  },
  watch: {
    codigo: function (val) {
      // if (!isNaN(val)) {
      //   this.errors.codigo = false
      //   if (val.includes(".")) {
      //     this.errors.codigo = true  
      //   }
      // }else{
      //   this.errors.codigo = true
      // }
    },
  },
  methods: {

    addRow: function () {
      this.estudios_realizados.push({
        nivel: '',
        nombre_institucion: '',
        anio_ingreso: '',
        grado_obtenido: '',
      });

      // console.log(this.estudios_realizados);
    },
    removeRow: function (index, estudio_realizado) {
      var idx = this.estudios_realizados.indexOf(estudio_realizado);
      // console.log(idx, index);
      if (idx > -1) {
        this.estudios_realizados.splice(idx, 1);
      }
    },
    addRowOtrosEstudios: function () {
      this.otros_estudios_realizados.push({
        idioma: '',
        nivel: '',
        ms_office: '',
        nivel_ms_office: ''
      })
    },
    removeRowOtrosEstudios: function (index, otro_estudio_realizado) {
      var idx = this.otros_estudios_realizados.indexOf(otro_estudio_realizado);
      console.log(idx, index);
      if (idx > -1) {
        this.otros_estudios_realizados.splice(idx, 1);
      }
    },
    formatDate: function(fecha_nacimiento){
      if (!fecha_nacimiento) {
        return ;  
      }
      let p = fecha_nacimiento.split("-")
      let fechaFormateada = p[2]+"-"+p[1]+"-"+p[0];
      return fechaFormateada;
    },
    sendData: async function () {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      this.estudios_realizados = this.estudios_realizados.map( estudio_realizado  => {
        estudio_realizado.anioIngreso = this.formatDate(estudio_realizado.anioIngresoWithoutFormat);
        // console.log(estudio_realizado);
        return estudio_realizado;
      });

      var raw = JSON.stringify({
        "codigo": this.codigo,
        "sexo": this.sexo,
        "estado": this.estado,
        "direccion": this.direccion,
        "fecha_nacimiento": this.formatDate(this.fecha_nacimiento),
        "lugar_nacimiento": this.lugar_nacimiento,
        "edad": this.edad,
        "brevete": this.brevete,
        "categoria_brevete": this.categoria_brevete,
        "telefono":this.telefono,
        "tiene_hijos": this.tiene_hijos,
        "numero_hijos": this.numero_hijos,
        "con_quien_vive_actualmente": this.vive_actualmente,
        "estudiosRealizados": this.estudios_realizados,
        "otrosEstudiosRealizados": this.otros_estudios_realizados,
        "cargoActual": this.cargo_actual,
        "area": this.area,
        "cuantoTiempoLaborando": this.tiempo_laborando,
        "ocupoCargoAnteriormente": this.cargo_anterior,
        "comoSienteLaborandoNosotros": this.sentir_labor,
        "queMotivoOcuparVacante": this.motivo_postular,
        "quienJefeInmediato": this.jefe_inmediato,
        "comoRelacionCompanierosTrabajo": this.relacion_compañeros,
        "caracteristicasPersonalesGustariaMejorar": this.caracteristicas_personales,
        "habilidadesPersonalesCaracterizan": this.habilidades_personales,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let url_remoto = "https://solucionesm4g.site:8443/marcador-people";
      let url_local  = "http://localhost:8080";

      let response = await  fetch(`${url_remoto}/api-funciones/crear-registro-ficha-interna-postulante`, requestOptions)
      let data = await response.json() ;
      return data;
    },
      sendFichaInternaPostulante: async function () {
      
      let response =  await this.sendData();
      let data_zoho =  JSON.parse(response.data)
          if (data_zoho.details.output == "0"){
            this.message = "Se han registrado éxitosamente";  
            $('#exampleModal').modal();
            setTimeout(() => {
              location.reload();  
            }, 3000);        
          }else{
             this.message =  data_zoho.details.output;
             $('#exampleModal').modal();
          }
    },


  },
  created: function () {
  }
})