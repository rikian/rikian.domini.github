// bagian pertama : memunculkan kartu tiap tiap pemain ketika halaman pertamakali dimuat
// memanggil element html
const pemain1 = document.querySelector(".pemain1");
const pemain2 = document.querySelector(".pemain2");
const pemain3 = document.querySelector(".pemain3");
const pemain4 = document.querySelector(".pemain4");

//variable data kartu
const dataKartu = {
  kartu0: { kiri: 0, kanan: 0, nilai: 25 },
  kartu1: { kiri: 0, kanan: 1, nilai: 1 },
  kartu2: { kiri: 0, kanan: 2, nilai: 2 },
  kartu3: { kiri: 0, kanan: 3, nilai: 3 },
  kartu4: { kiri: 0, kanan: 4, nilai: 4 },
  kartu5: { kiri: 0, kanan: 5, nilai: 5 },
  kartu6: { kiri: 0, kanan: 6, nilai: 6 },
  kartu7: { kiri: 1, kanan: 1, nilai: 2 },
  kartu8: { kiri: 1, kanan: 2, nilai: 3 },
  kartu9: { kiri: 1, kanan: 3, nilai: 4 },
  kartu10: { kiri: 1, kanan: 4, nilai: 5 },
  kartu11: { kiri: 1, kanan: 5, nilai: 6 },
  kartu12: { kiri: 1, kanan: 6, nilai: 7 },
  kartu13: { kiri: 2, kanan: 2, nilai: 4 },
  kartu14: { kiri: 2, kanan: 3, nilai: 5 },
  kartu15: { kiri: 2, kanan: 4, nilai: 6 },
  kartu16: { kiri: 2, kanan: 5, nilai: 7 },
  kartu17: { kiri: 2, kanan: 6, nilai: 8 },
  kartu18: { kiri: 3, kanan: 3, nilai: 6 },
  kartu19: { kiri: 3, kanan: 4, nilai: 7 },
  kartu20: { kiri: 3, kanan: 5, nilai: 8 },
  kartu21: { kiri: 3, kanan: 6, nilai: 9 },
  kartu22: { kiri: 4, kanan: 4, nilai: 8 },
  kartu23: { kiri: 4, kanan: 5, nilai: 9 },
  kartu24: { kiri: 4, kanan: 6, nilai: 10 },
  kartu25: { kiri: 5, kanan: 5, nilai: 10 },
  kartu26: { kiri: 5, kanan: 6, nilai: 11 },
  kartu27: { kiri: 6, kanan: 6, nilai: 12 },
};

// masukkan kartu ke data kartu
for (let i = 0; i < 28; i++) {
  const kartu = document.createElement("img");
  kartu.setAttribute("src", `gambar/${i}.svg`);
  kartu.setAttribute("id", "kartu" + i);
  kartu.setAttribute("draggable", "true");
  kartu.addEventListener("drag", pilihKartu);
  dataKartu[`kartu${i}`]["info"] = kartu;
}

// variable untuk kota kartu dengan kartu yang telah diacak
const kotakKartu = Object.keys(dataKartu).sort(() => Math.random() - 0.5);

// variable untuk menampung kartu para pemain
const kartuPemain1 = {};
const kartuPemain2 = {};
const kartuPemain3 = {};
const kartuPemain4 = {};

//masukan kartu untuk tiap tiap pemain
for (let i = 0; i < 28; i++) {
  if (Object.keys(kartuPemain1).length < 7) {
    kartuPemain1[kotakKartu[0]] = dataKartu[kotakKartu[0]].info;
    pemain1.appendChild(dataKartu[kotakKartu[0]].info);
    kotakKartu.splice(0, 1);
  } else if (Object.keys(kartuPemain2).length < 7) {
    kartuPemain2[kotakKartu[0]] = dataKartu[kotakKartu[0]].info;
    pemain2.appendChild(dataKartu[kotakKartu[0]].info);
    kotakKartu.splice(0, 1);
  } else if (Object.keys(kartuPemain3).length < 7) {
    kartuPemain3[kotakKartu[0]] = dataKartu[kotakKartu[0]].info;
    pemain3.appendChild(dataKartu[kotakKartu[0]].info);
    kotakKartu.splice(0, 1);
  } else if (Object.keys(kartuPemain4).length < 7) {
    kartuPemain4[kotakKartu[0]] = dataKartu[kotakKartu[0]].info;
    pemain4.appendChild(dataKartu[kotakKartu[0]].info);
    kotakKartu.splice(0, 1);
  }
}

// bagian kedua: menampilkan kartu pilihan pemain ke papan

// mengambil id papan
const papan = document.getElementById("papan");
const context = papan.getContext("2d");
papan.width = papan.scrollWidth;
papan.height = papan.scrollHeight;

papan.addEventListener("dragover", dragOver);
papan.addEventListener("drop", lemparKartu);

// variable untuk menampung kartu pilihan pemain
let kartuPilihanPemain;

// function pilih kartu
function pilihKartu(e) {
  kartuPilihanPemain = e.target.id;
  // console.log(kartuPilihanPemain);
}

// function dragOver
function dragOver(e) {
  e.preventDefault();
}

//function drop
function lemparKartu(e) {
  const gambar = dataKartu[kartuPilihanPemain].info;
  context.drawImage(gambar, 400, 200, 70, 40);
}
