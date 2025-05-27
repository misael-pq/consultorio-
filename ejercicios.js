const formRegistro = document.getElementById('formRegistro')
const formLogin = document.getElementById('formLogin')
const formVeterinaria = document.getElementById('formVeterinaria')

const registroSection = document.getElementById('registroSection')
const loginSection = document.getElementById('loginSection')
const formularioSection = document.getElementById('formularioSection')

const linkLogin = document.getElementById('linkLogin')
const linkRegistro = document.getElementById('linkRegistro')
const cerrarSesionBtn = document.getElementById('cerrarSesionBtn')

const nombreUsuarioSpan = document.getElementById('nombreUsuario')

const previewFoto = document.getElementById('previewFoto')

const modal = document.createElement('div')
modal.id = 'modalCita'
modal.style.position = 'fixed'
modal.style.top = '0'
modal.style.left = '0'
modal.style.width = '100%'
modal.style.height = '100%'
modal.style.backgroundColor = 'rgba(0,0,0,0.6)'
modal.style.display = 'none'
modal.style.justifyContent = 'center'
modal.style.alignItems = 'center'
modal.style.zIndex = '1000'

modal.innerHTML = `
  <div style="background:#fff; color:#000; border-radius:10px; max-width:400px; width:90%; padding:20px; position:relative;">
    <h2 style="text-align:center; color:#50e3c2;">Cita Médica Reservada</h2>
    <p><strong>Dueño:</strong> <span id="modalNombreDueno"></span></p>
    <p><strong>Teléfono:</strong> <span id="modalTelefonoDueno"></span></p>
    <p><strong>Correo:</strong> <span id="modalEmailDueno"></span></p>
    <p><strong>Nombre mascota:</strong> <span id="modalNombreMascota"></span></p>
    <p><strong>Raza:</strong> <span id="modalRazaMascota"></span></p>
    <p><strong>Edad:</strong> <span id="modalEdadMascota"></span> años</p>
    <p><strong>Peso:</strong> <span id="modalPesoMascota"></span> kg</p>
    <p><strong>Tipo:</strong> <span id="modalTipoMascota"></span></p>
    <p><strong>Doctor:</strong> <span id="modalDoctorMascota"></span></p>
    <p><strong>Fecha:</strong> <span id="modalFechaCita"></span></p>
    <p><strong>Hora:</strong> <span id="modalHoraCita"></span></p>
    <p><strong>Motivo:</strong> <span id="modalMotivoCita"></span></p>
    <img id="modalFotoMascota" src="" alt="Foto mascota" style="width:100%; max-height:200px; object-fit:contain; display:none; border-radius:8px; margin-top:10px;" />
    <button id="cerrarModalBtn" style="background:#50e3c2; border:none; border-radius:10px; padding:10px; width:100%; font-weight:700; margin-top:15px; cursor:pointer;">Cerrar</button>
  </div>
`

document.body.appendChild(modal)

const cerrarModalBtn = document.getElementById('cerrarModalBtn')
cerrarModalBtn.addEventListener('click', () => {
  modal.style.display = 'none'
})

linkLogin.addEventListener('click', e => {
  e.preventDefault()
  registroSection.style.display = 'none'
  loginSection.style.display = 'block'
  formularioSection.style.display = 'none'
})

linkRegistro.addEventListener('click', e => {
  e.preventDefault()
  registroSection.style.display = 'block'
  loginSection.style.display = 'none'
  formularioSection.style.display = 'none'
})

cerrarSesionBtn.addEventListener('click', () => {
  localStorage.removeItem('usuarios')
  localStorage.removeItem('usuarioActual')
  registroSection.style.display = 'block'
  loginSection.style.display = 'none'
  formularioSection.style.display = 'none'
  nombreUsuarioSpan.textContent = ''
})

function mostrarPasswordToggle() {
  const btns = document.querySelectorAll('.btnShowPass')
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target')
      const input = document.getElementById(targetId)
      if (input.type === 'password') {
        input.type = 'text'
        btn.innerHTML = '<i class="fas fa-eye-slash"></i>'
      } else {
        input.type = 'password'
        btn.innerHTML = '<i class="fas fa-eye"></i>'
      }
    })
  })
}
mostrarPasswordToggle()

formRegistro.addEventListener('submit', e => {
  e.preventDefault()
  const nombre = document.getElementById('regNombre').value.trim()
  const correo = document.getElementById('regCorreo').value.trim()
  const pass = document.getElementById('regPass').value.trim()

  if (!nombre || !correo || !pass) {
    alert('Completa todos los campos para registrarte')
    return
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
  const existeUsuario = usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase())

  if (existeUsuario) {
    alert('El correo ya está registrado. Por favor inicia sesión.')
    registroSection.style.display = 'none'
    loginSection.style.display = 'block'
    formularioSection.style.display = 'none'
    return
  }

  usuarios.push({ nombre, correo, pass })
  localStorage.setItem('usuarios', JSON.stringify(usuarios))

  alert('Registro exitoso. Ahora inicia sesión.')

  registroSection.style.display = 'none'
  loginSection.style.display = 'block'
  formularioSection.style.display = 'none'
})

formLogin.addEventListener('submit', e => {
  e.preventDefault()
  const correo = document.getElementById('loginCorreo').value.trim()
  const pass = document.getElementById('loginPass').value.trim()

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
  if (usuarios.length === 0) {
    alert('No hay usuarios registrados. Por favor regístrate primero.')
    registroSection.style.display = 'block'
    loginSection.style.display = 'none'
    formularioSection.style.display = 'none'
    return
  }

  const usuario = usuarios.find(u => u.correo.toLowerCase() === correo.toLowerCase() && u.pass === pass)

  if (!usuario) {
    alert('Correo o contraseña incorrectos.')
    return
  }

  localStorage.setItem('usuarioActual', JSON.stringify(usuario))

  nombreUsuarioSpan.textContent = usuario.nombre

  registroSection.style.display = 'none'
  loginSection.style.display = 'none'
  formularioSection.style.display = 'block'
})

formVeterinaria.addEventListener('submit', e => {
  e.preventDefault()

  alert('Cita médica reservada. Gracias por confiar en VetCare!')

  const nombreDueno = document.getElementById('nombreDueno').value.trim()
  const telefonoDueno = document.getElementById('telefonoDueno').value.trim()
  const emailDueno = document.getElementById('emailDueno').value.trim()
  const nombreMascota = document.getElementById('nombreMascota').value.trim()
  const razaMascota = document.getElementById('razaMascota').value.trim()
  const edadMascota = document.getElementById('edadMascota').value.trim()
  const pesoMascota = document.getElementById('pesoMascota').value.trim()
  const tipoMascota = document.getElementById('tipoMascota').value.trim()
  const doctorMascota = document.getElementById('doctorMascota').value.trim()
  const fechaCita = document.getElementById('fechaCita').value.trim()
  const horaCita = document.getElementById('horaCita').value.trim()
  const motivoCita = document.getElementById('motivoCita').value.trim()

  const fotoSrc = previewFoto.src

  document.getElementById('modalNombreDueno').textContent = nombreDueno
  document.getElementById('modalTelefonoDueno').textContent = telefonoDueno
  document.getElementById('modalEmailDueno').textContent = emailDueno
  document.getElementById('modalNombreMascota').textContent = nombreMascota
  document.getElementById('modalRazaMascota').textContent = razaMascota
  document.getElementById('modalEdadMascota').textContent = edadMascota
  document.getElementById('modalPesoMascota').textContent = pesoMascota
  document.getElementById('modalTipoMascota').textContent = tipoMascota
  document.getElementById('modalDoctorMascota').textContent = doctorMascota
  document.getElementById('modalFechaCita').textContent = fechaCita
  document.getElementById('modalHoraCita').textContent = horaCita
  document.getElementById('modalMotivoCita').textContent = motivoCita

  const modalFotoMascota = document.getElementById('modalFotoMascota')
  if (fotoSrc && fotoSrc !== window.location.href) {
    modalFotoMascota.src = fotoSrc
    modalFotoMascota.style.display = 'block'
  } else {
    modalFotoMascota.style.display = 'none'
  }

  modal.style.display = 'flex'

  formVeterinaria.reset()
  previewFoto.style.display = 'none'
})

document.getElementById('fotoMascota').addEventListener('change', e => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      previewFoto.src = e.target.result
      previewFoto.style.display = 'block'
    }
    reader.readAsDataURL(file)
  } else {
    previewFoto.style.display = 'none'
  }
})

// Si ya hay usuario logueado, mostrar formulario
window.addEventListener('load', () => {
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'))
  if (usuarioActual) {
    nombreUsuarioSpan.textContent = usuarioActual.nombre
    registroSection.style.display = 'none'
    loginSection.style.display = 'none'
    formularioSection.style.display = 'block'
  } else {
    registroSection.style.display = 'block'
    loginSection.style.display = 'none'
    formularioSection.style.display = 'none'
  }
})
