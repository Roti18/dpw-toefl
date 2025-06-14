const edit = document.getElementById("edit");
const body = document.querySelector("body");
const nama = document.getElementById("name");
const email = document.getElementById("email");
const no = document.getElementById("no");

// Simpan HTML original untuk bisa kembali
const originalHTML = body.innerHTML;

edit.addEventListener("click", () => {
  // Kosongkan text content elemen original
  nama.textContent = "";
  email.textContent = "";
  no.textContent = "";

  // Ganti dengan form edit
  body.innerHTML = `
      <div class="container">
        <div class="header">
            <h1>Edit Personal Information</h1>
        </div>
       
        <div class="form-container">
            <div class="success-message" id="successMessage" style="display: none;">
                Data berhasil disimpan!
            </div>
            <form id="editForm">
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" value="${
                      nama.textContent || "John Doe"
                    }" required>
                </div>
                <div class="form-group">
                    <label for="emailForm">Email</label>
                    <input type="email" id="emailForm" name="email" value="${
                      email.textContent || "john.doe@example.com"
                    }" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" value="${
                      no.textContent || "+62 812-3456-7890"
                    }" required>
                </div>
                <div class="button-group">
                    <button type="button" class="btn btn-secondary" id="cancel">Cancel</button>
                    <button type="submit" class="btn btn-primary" id="save">Save Changes</button>
                </div>
            </form>
        </div>
      </div>
  `;

  // Setelah HTML diinjeksi, setup event listeners
  setupFormEvents();
});

function setupFormEvents() {
  const form = document.getElementById("editForm");
  const save = document.getElementById("save");
  const cancel = document.getElementById("cancel");
  const fullName = document.getElementById("fullName");
  const emailForm = document.getElementById("emailForm"); // Ganti nama ID untuk menghindari konflik
  const phone = document.getElementById("phone");
  const successMessage = document.getElementById("successMessage");

  // Event listener untuk form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah form submit default

    // Tampilkan pesan sukses
    successMessage.style.display = "block";

    // Tunggu sebentar, lalu update data dan kembali ke view
    setTimeout(() => {
      updateDataAndReturn(fullName.value, emailForm.value, phone.value);
    }, 1500);
  });

  // Event listener untuk tombol save (backup jika form submit tidak bekerja)
  save.addEventListener("click", (e) => {
    if (form.checkValidity()) {
      // Cek validasi form
      e.preventDefault();

      // Tampilkan pesan sukses
      successMessage.style.display = "block";

      // Tunggu sebentar, lalu update data dan kembali ke view
      setTimeout(() => {
        updateDataAndReturn(fullName.value, emailForm.value, phone.value);
      }, 1500);
    }
  });

  // Event listener untuk tombol cancel
  cancel.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin membatalkan perubahan?")) {
      // Kembali ke tampilan original
      body.innerHTML = originalHTML;

      // Re-attach event listener untuk tombol edit
      reattachEditListener();
    }
  });

  // Auto-format nomor telepon
  phone.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("62")) {
      value = "+" + value.slice(0, 2);
      " " + value.slice(2, 5) + "-" + value.slice(5, 9) + "-" + value.slice(9);
    }
    e.target.value = value;
  });
}

function updateDataAndReturn(nameValue, emailValue, phoneValue) {
  // Kembali ke tampilan original
  body.innerHTML = originalHTML;

  // Update data di elemen original
  const updatedNama = document.getElementById("name");
  const updatedEmail = document.getElementById("email");
  const updatedNo = document.getElementById("no");

  updatedNama.textContent = nameValue;
  updatedEmail.textContent = emailValue;
  updatedNo.textContent = phoneValue;

  // Re-attach event listener untuk tombol edit
  reattachEditListener();

  console.log("Data berhasil diupdate:", {
    name: nameValue,
    email: emailValue,
    phone: phoneValue,
  });
}

function reattachEditListener() {
  // Re-attach event listener untuk tombol edit yang baru
  const newEdit = document.getElementById("edit");
  if (newEdit) {
    newEdit.addEventListener("click", () => {
      edit.click(); // Trigger event edit yang sudah ada
    });
  }
}

// Alternative: Jika ingin menggunakan redirect ke profile.html
function cancelToProfile() {
  window.location.href = "profile.html";
}
