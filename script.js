const mainAhh = document.querySelector(".mainAhh");
mainAhh.addEventListener("click", function () {
  // bagian pertama : memunculkan kartu tiap tiap pemain ketika halaman pertamakali dimuat
  // memanggil element html
  const pemain1 = document.querySelector(".pemain1");
  const pemain2 = document.querySelector(".pemain2");
  const pemain3 = document.querySelector(".pemain3");
  const pemain4 = document.querySelector(".pemain4");

  // audio
  const gaplek = new Audio();
  gaplek.src = "audio/gaple.mp3";
  const jalan = new Audio();
  jalan.src = "audio/jalan.mp3";
  const kalah = new Audio();
  kalah.src = "audio/kalah.mp3";
  const lewat = new Audio();
  lewat.src = "audio/lewat.mp3";
  const menangis = new Audio();
  menangis.src = "audio/menang.mp3";

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
    const latar = document.createElement("img");
    latar.setAttribute("src", `gambar/latar.png`);
    latar.setAttribute("id", i);
    latar.setAttribute("draggable", "false");
    dataKartu[`kartu${i}`]["latar"] = latar;

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
      pemain1.appendChild(dataKartu[kotakKartu[0]].latar);
      kotakKartu.splice(0, 1);
    } else if (Object.keys(kartuPemain2).length < 7) {
      kartuPemain2[kotakKartu[0]] = dataKartu[kotakKartu[0]].info;
      pemain2.appendChild(dataKartu[kotakKartu[0]].latar);
      kotakKartu.splice(0, 1);
    } else if (Object.keys(kartuPemain3).length < 7) {
      kartuPemain3[kotakKartu[0]] = dataKartu[kotakKartu[0]].info;
      pemain3.appendChild(dataKartu[kotakKartu[0]].info);
      kotakKartu.splice(0, 1);
    } else if (Object.keys(kartuPemain4).length < 7) {
      kartuPemain4[kotakKartu[0]] = dataKartu[kotakKartu[0]].info;
      pemain4.appendChild(dataKartu[kotakKartu[0]].latar);
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

  // variable global untuk menampung kartu pilihan pemain
  let kartuPilihanPemain;

  // variable untuk posisi kartu
  const sumbuX = 50;
  const sumbuY = 180;
  const lebar = 50;
  const tinggi = 30;

  // function untuk rotasi kartu
  function rotasiKartu(gambar, sumbuX, sumbuY, lebar, tinggi, rotasi) {
    let radian = (rotasi * Math.PI) / 180;
    context.translate(sumbuX + lebar / 2, sumbuY + tinggi / 2);
    context.rotate(radian);
    context.drawImage(gambar, (lebar / 2) * -1, (tinggi / 2) * -1, lebar, tinggi);
    context.rotate(radian * -1);
    context.translate((sumbuX + lebar / 2) * -1, (sumbuY + tinggi / 2) * -1);
  }

  // function pilih kartu
  function pilihKartu(e) {
    kartuPilihanPemain = e.target.id;
    // console.log(kartuPilihanPemain);
  }

  // function dragOver
  function dragOver(e) {
    e.preventDefault();
    // console.log(e.offsetX);
  }

  // bantuan untuk pengali sumbu x dan y
  const xKiri = [];
  const xKanan = [];

  // untuk nilai kartu di papan
  const nilaiKiriPapan = document.querySelector(".nilaiKiri");
  const nilaiKananPapan = document.querySelector(".nilaiKanan");

  //function drop, atau jika kartu yang berada di atas papan dilepas
  function lemparKartu(e) {
    const gambar = dataKartu[kartuPilihanPemain].info;

    //cek status giliran pemain, jika satu, berati boleh melempar kartu
    if (pemain3.children[0].innerHTML === "1") {
      //turn pertama
      if (xKiri.length == 0 && xKanan.length == 0) {
        rotasiKartu(gambar, 350 - sumbuX * xKiri.length, sumbuY, lebar, tinggi, 0);
        // masukkan nilai kepapan
        nilaiKiriPapan.innerHTML = dataKartu[kartuPilihanPemain].kiri;
        nilaiKananPapan.innerHTML = dataKartu[kartuPilihanPemain].kanan;
        //masukkan kartu yang dibung ke x kiri dan kanan
        xKiri.push(gambar);
        xKanan.push(gambar);
        // ubah status pemain menjadi 0
        pemain3.children[0].innerHTML = "0";
        pemain3.children[0].style.backgroundColor = "red";
        pemain3.children[1].innerHTML = kartuPilihanPemain;
        // ubah target pemain
        pemain4.children[0].innerHTML = "1";
        pemain4.children[0].style.backgroundColor = "green";
        // hilangkan kartu yang dibuang pemain
        kartuPemain3[kartuPilihanPemain].style.display = "none";
        delete kartuPemain3[kartuPilihanPemain];
        lemparAuto();
        return;
      }

      // cek posisi offset kartu
      if (e.offsetX < 400) {
        // turn ke dua dan selanjutnya
        // cek pertama, nilai kartu kiri di papan dengan kartu kiri pemain
        if (nilaiKiriPapan.innerHTML == dataKartu[kartuPilihanPemain].kiri) {
          //cek pengali kiri
          if (xKiri.length < 7) {
            rotasiKartu(gambar, 350 - sumbuX * xKiri.length, sumbuY, lebar, tinggi, 180);
          } else if (xKiri.length == 7) {
            rotasiKartu(gambar, 350 - sumbuX * xKiri.length + 40, sumbuY - 40, lebar, tinggi, 270);
          } else if (xKiri.length > 7) {
            rotasiKartu(gambar, -350 + sumbuX * xKiri.length, sumbuY - 80, lebar, tinggi, 00);
          }
          // masukkan nilai ke papan
          nilaiKiriPapan.innerHTML = dataKartu[kartuPilihanPemain].kanan;
          //masukkan kartu yang dibung ke x kiri
          xKiri.push(gambar);
          // ubah status pemain menjadi 0
          pemain3.children[0].innerHTML = "0";
          pemain3.children[0].style.backgroundColor = "red";
          pemain3.children[1].innerHTML = kartuPilihanPemain;
          // ubah target pemain
          pemain4.children[0].innerHTML = "1";
          pemain4.children[0].style.backgroundColor = "green";
          // hilangkan kartu yang dibuang pemain
          kartuPemain3[kartuPilihanPemain].style.display = "none";
          delete kartuPemain3[kartuPilihanPemain];
          lemparAuto();
          menang();
          return;
        }
        // cek kedua, nilai kartu kiri di papan dengan kartu kanan pemain
        else if (nilaiKiriPapan.innerHTML == dataKartu[kartuPilihanPemain].kanan) {
          //cek pengali kiri
          if (xKiri.length < 7) {
            rotasiKartu(gambar, 350 - sumbuX * xKiri.length, sumbuY, lebar, tinggi, 0);
          } else if (xKiri.length == 7) {
            rotasiKartu(gambar, 350 - sumbuX * xKiri.length + 40, sumbuY - 40, lebar, tinggi, 90);
          } else if (xKiri.length > 7) {
            rotasiKartu(gambar, -350 + sumbuX * xKiri.length, sumbuY - 80, lebar, tinggi, 180);
          }
          // masukkan nilai kepapan
          nilaiKiriPapan.innerHTML = dataKartu[kartuPilihanPemain].kiri;
          //masukkan kartu yang dibung ke x kiri
          xKiri.push(gambar);
          // ubah status pemain menjadi 0
          pemain3.children[0].innerHTML = "0";
          pemain3.children[0].style.backgroundColor = "red";
          pemain3.children[1].innerHTML = kartuPilihanPemain;
          // ubah target pemain
          pemain4.children[0].innerHTML = "1";
          pemain4.children[0].style.backgroundColor = "green";
          // hilangkan kartu yang dibuang pemain
          kartuPemain3[kartuPilihanPemain].style.display = "none";
          delete kartuPemain3[kartuPilihanPemain];
          lemparAuto();
          menang();
          return;
        }
      } else if (e.offsetX >= 400) {
        // cek ketiga, nilai kartu kanan di papan dengan kartu kiri pemain
        if (nilaiKananPapan.innerHTML == dataKartu[kartuPilihanPemain].kiri) {
          //cek pengali kanan
          if (xKanan.length < 7) {
            rotasiKartu(gambar, 350 + sumbuX * xKanan.length, sumbuY, lebar, tinggi, 0);
          } else if (xKanan.length == 7) {
            rotasiKartu(gambar, 350 + sumbuX * xKanan.length - 40, sumbuY + 40, lebar, tinggi, 90);
          } else if (xKanan.length > 7) {
            rotasiKartu(gambar, 1050 - lebar * xKanan.length, sumbuY + 80, lebar, tinggi, 180);
          }
          // masukkan nilai kepapan
          nilaiKananPapan.innerHTML = dataKartu[kartuPilihanPemain].kanan;
          //masukkan kartu yang dibung ke x kanan
          xKanan.push(gambar);
          // ubah status pemain menjadi 0
          pemain3.children[0].innerHTML = "0";
          pemain3.children[0].style.backgroundColor = "red";
          pemain3.children[1].innerHTML = kartuPilihanPemain;
          // ubah target pemain
          pemain4.children[0].innerHTML = "1";
          pemain4.children[0].style.backgroundColor = "green";
          // hilangkan kartu yang dibuang pemain
          kartuPemain3[kartuPilihanPemain].style.display = "none";
          delete kartuPemain3[kartuPilihanPemain];
          lemparAuto();
          menang();
          return;
        }
        // cek keempat, nilai kartu kanan di papan dengan kartu kanan pemain
        else if (nilaiKananPapan.innerHTML == dataKartu[kartuPilihanPemain].kanan) {
          //cek pengali kanan
          if (xKanan.length < 7) {
            rotasiKartu(gambar, 350 + sumbuX * xKanan.length, sumbuY, lebar, tinggi, 180);
          } else if (xKanan.length == 7) {
            rotasiKartu(gambar, 350 + sumbuX * xKanan.length - 40, sumbuY + 40, lebar, tinggi, 270);
          } else if (xKanan.length > 7) {
            rotasiKartu(gambar, 1050 - lebar * xKanan.length, sumbuY + 80, lebar, tinggi, 0);
          }
          // masukkan nilai kepapan
          nilaiKananPapan.innerHTML = dataKartu[kartuPilihanPemain].kiri;
          //masukkan kartu yang dibung ke x kanan
          xKanan.push(gambar);
          // ubah status pemain menjadi 0
          pemain3.children[0].innerHTML = "0";
          pemain3.children[0].style.backgroundColor = "red";
          pemain3.children[1].innerHTML = kartuPilihanPemain;
          // ubah target pemain
          pemain4.children[0].innerHTML = "1";
          pemain4.children[0].style.backgroundColor = "green";
          // hilangkan kartu yang dibuang pemain
          kartuPemain3[kartuPilihanPemain].style.display = "none";
          delete kartuPemain3[kartuPilihanPemain];
          lemparAuto();
          menang();
          return;
        }
      }
    }
  }

  // bagian ke-tiga
  //button html
  const btnP4 = document.querySelector("#btnP4");
  const btnP1 = document.querySelector("#btnP1");
  const btnP2 = document.querySelector("#btnP2");

  btnP4.addEventListener("click", () => otomatisLempar(pemain4, pemain1, kartuPemain4));
  btnP1.addEventListener("click", () => otomatisLempar(pemain1, pemain2, kartuPemain1));
  btnP2.addEventListener("click", () => otomatisLempar(pemain2, pemain3, kartuPemain2));

  //function otomatis lempar pemain 4 1 2
  function otomatisLempar(pemain, targetPemain, kartuPemain) {
    // cek status apakah sama dengan 1
    if (pemain.children[0].innerHTML === "1") {
      //cek ada atau tidak kartu yang sesuai dengan nilai di papan
      for (let i = 0; i < Object.keys(kartuPemain).length; i++) {
        kartuPilihanPemain = Object.keys(kartuPemain)[i];
        const gambar = dataKartu[kartuPilihanPemain].info;
        const latar = dataKartu[kartuPilihanPemain].latar;
        // turn ke dua dan selanjutnya
        // cek pertama, nilai kartu kiri di papan dengan kartu kiri pemain 4
        if (nilaiKiriPapan.innerHTML == dataKartu[kartuPilihanPemain].kiri) {
          //cek pengali kiri
          if (xKiri.length < 7) {
            rotasiKartu(gambar, 350 - sumbuX * xKiri.length, sumbuY, lebar, tinggi, 180);
          } else if (xKiri.length == 7) {
            rotasiKartu(gambar, 350 - sumbuX * xKiri.length + 40, sumbuY - 40, lebar, tinggi, 270);
          } else if (xKiri.length > 7) {
            rotasiKartu(gambar, -350 + sumbuX * xKiri.length, sumbuY - 80, lebar, tinggi, 00);
          }
          // masukkan nilai ke papan
          nilaiKiriPapan.innerHTML = dataKartu[kartuPilihanPemain].kanan;
          //masukkan kartu yang dibung ke x kiri
          xKiri.push(gambar);
          // ubah status pemain menjadi 0
          pemain.children[0].innerHTML = "0";
          pemain.children[0].style.backgroundColor = "red";
          pemain.children[1].innerHTML = kartuPilihanPemain;
          // ubah target pemain
          targetPemain.children[0].innerHTML = "1";
          targetPemain.children[0].style.backgroundColor = "green";
          // hilangkan kartu yang dibuang pemain
          latar.style.display = "none";
          delete kartuPemain[kartuPilihanPemain];
          // hentikan pencarian jika kartu yang sesuai ditemukan
          lemparAuto();
          menang();
          break;
        }
        // cek kedua, nilai kartu kiri di papan dengan kartu kanan pemain
        else if (nilaiKiriPapan.innerHTML == dataKartu[kartuPilihanPemain].kanan) {
          //cek pengali kiri
          if (xKiri.length < 7) {
            rotasiKartu(gambar, 350 - sumbuX * xKiri.length, sumbuY, lebar, tinggi, 0);
          } else if (xKiri.length == 7) {
            rotasiKartu(gambar, 350 - sumbuX * xKiri.length + 40, sumbuY - 40, lebar, tinggi, 90);
          } else if (xKiri.length > 7) {
            rotasiKartu(gambar, -350 + sumbuX * xKiri.length, sumbuY - 80, lebar, tinggi, 180);
          }
          // masukkan nilai kepapan
          nilaiKiriPapan.innerHTML = dataKartu[kartuPilihanPemain].kiri;
          //masukkan kartu yang dibung ke x kiri
          xKiri.push(gambar);
          // ubah status pemain menjadi 0
          pemain.children[0].innerHTML = "0";
          pemain.children[0].style.backgroundColor = "red";
          pemain.children[1].innerHTML = kartuPilihanPemain;
          // ubah target pemain
          targetPemain.children[0].innerHTML = "1";
          targetPemain.children[0].style.backgroundColor = "green";
          // hilangkan kartu yang dibuang pemain
          latar.style.display = "none";
          delete kartuPemain[kartuPilihanPemain];
          lemparAuto();
          menang();
          break;
        }
        // cek ketiga, nilai kartu kanan di papan dengan kartu kiri pemain
        else if (nilaiKananPapan.innerHTML == dataKartu[kartuPilihanPemain].kiri) {
          //cek pengali kanan
          if (xKanan.length < 7) {
            rotasiKartu(gambar, 350 + sumbuX * xKanan.length, sumbuY, lebar, tinggi, 0);
          } else if (xKanan.length == 7) {
            rotasiKartu(gambar, 350 + sumbuX * xKanan.length - 40, sumbuY + 40, lebar, tinggi, 90);
          } else if (xKanan.length > 7) {
            rotasiKartu(gambar, 1050 - lebar * xKanan.length, sumbuY + 80, lebar, tinggi, 180);
          }
          // masukkan nilai kepapan
          nilaiKananPapan.innerHTML = dataKartu[kartuPilihanPemain].kanan;
          //masukkan kartu yang dibung ke x kanan
          xKanan.push(gambar);
          // ubah status pemain menjadi 0
          pemain.children[0].innerHTML = "0";
          pemain.children[0].style.backgroundColor = "red";
          pemain.children[1].innerHTML = kartuPilihanPemain;
          // ubah target pemain
          targetPemain.children[0].innerHTML = "1";
          targetPemain.children[0].style.backgroundColor = "green";
          // hilangkan kartu yang dibuang pemain
          latar.style.display = "none";
          delete kartuPemain[kartuPilihanPemain];
          lemparAuto();
          menang();
          break;
        }
        // cek keempat, nilai kartu kanan di papan dengan kartu kanan pemain
        else if (nilaiKananPapan.innerHTML == dataKartu[kartuPilihanPemain].kanan) {
          //cek pengali kanan
          if (xKanan.length < 7) {
            rotasiKartu(gambar, 350 + sumbuX * xKanan.length, sumbuY, lebar, tinggi, 180);
          } else if (xKanan.length == 7) {
            rotasiKartu(gambar, 350 + sumbuX * xKanan.length - 40, sumbuY + 40, lebar, tinggi, 270);
          } else if (xKanan.length > 7) {
            rotasiKartu(gambar, 1050 - lebar * xKanan.length, sumbuY + 80, lebar, tinggi, 0);
          }
          // masukkan nilai kepapan
          nilaiKananPapan.innerHTML = dataKartu[kartuPilihanPemain].kiri;
          //masukkan kartu yang dibung ke x kanan
          xKanan.push(gambar);
          // ubah status pemain menjadi 0
          pemain.children[0].innerHTML = "0";
          pemain.children[0].style.backgroundColor = "red";
          pemain.children[1].innerHTML = kartuPilihanPemain;
          // ubah target pemain
          targetPemain.children[0].innerHTML = "1";
          targetPemain.children[0].style.backgroundColor = "green";
          // hilangkan kartu yang dibuang pemain
          latar.style.display = "none";
          delete kartuPemain[kartuPilihanPemain];
          lemparAuto();
          menang();
          break;
        }
        // jika tidak ada kartu yang sesuai
        else if (i + 1 == Object.keys(kartuPemain).length) {
          // ubah status pemain menjadi 0
          pemain.children[0].innerHTML = "0";
          pemain.children[0].style.backgroundColor = "red";
          pemain.children[1].innerHTML = "lewat";
          lewat.play();
          // ubah target pemain
          targetPemain.children[0].innerHTML = "1";
          targetPemain.children[0].style.backgroundColor = "green";
          gaple();
          lemparAuto();
          break;
        }
      }
    } else {
      console.log("ini bukan jalan anda.");
      return;
    }
  }

  //function
  let autoLempar;

  function lemparAuto() {
    autoLempar = setTimeout(function () {
      //cek status pemain
      if (pemain4.children[0].innerHTML === "1") {
        otomatisLempar(pemain4, pemain1, kartuPemain4);
        return;
      } else if (pemain1.children[0].innerHTML === "1") {
        otomatisLempar(pemain1, pemain2, kartuPemain1);
        return;
      } else if (pemain2.children[0].innerHTML === "1") {
        otomatisLempar(pemain2, pemain3, kartuPemain2);
        return;
      }
    }, 1000);
  }

  //button untuk lewat
  pemain3.children[2].addEventListener("click", function () {
    //cek status pemain
    if (pemain3.children[0].innerHTML === "1") {
      for (let i = 0; i < Object.keys(kartuPemain3).length; i++) {
        kartuPilihanPemain = Object.keys(kartuPemain3)[i];
        // cek pertama
        if (nilaiKiriPapan.innerHTML == dataKartu[kartuPilihanPemain].kiri) {
          break;
        }
        // cek kedua
        else if (nilaiKiriPapan.innerHTML == dataKartu[kartuPilihanPemain].kanan) {
          break;
        }
        // cek ketiga
        else if (nilaiKananPapan.innerHTML == dataKartu[kartuPilihanPemain].kiri) {
          break;
        }
        // cek keempat
        else if (nilaiKananPapan.innerHTML == dataKartu[kartuPilihanPemain].kanan) {
          break;
        }
        // jika tidak ada kartu yang sesuai
        else if (i + 1 == Object.keys(kartuPemain3).length) {
          // ubah status pemain menjadi 0
          pemain3.children[0].innerHTML = "0";
          pemain3.children[0].style.backgroundColor = "red";
          pemain3.children[1].innerHTML = "lewat";
          lewat.play();
          // ubah target pemain
          pemain4.children[0].innerHTML = "1";
          pemain4.children[0].style.backgroundColor = "green";
          gaple();
          lemparAuto();
          return;
        }
      }
    }
  });

  //kondisi menang
  const modalMenang = document.getElementById("menang");
  function menang() {
    if (Object.keys(kartuPemain1).length == 0) {
      modalMenang.style.display = "block";
      modalMenang.children[1].innerHTML = "Pemain 1 menang";
      kalah.play();
      clearTimeout(autoLempar);
      return;
    } else if (Object.keys(kartuPemain2).length == 0) {
      modalMenang.style.display = "block";
      modalMenang.children[1].innerHTML = "Pemain 2 menang";
      clearTimeout(autoLempar);
      kalah.play();
      return;
    } else if (Object.keys(kartuPemain3).length == 0) {
      modalMenang.style.display = "block";
      modalMenang.children[1].innerHTML = "Pemain 3 menang";
      clearTimeout(autoLempar);
      menangis.play();
      return;
    } else if (Object.keys(kartuPemain4).length == 0) {
      modalMenang.style.display = "block";
      modalMenang.children[1].innerHTML = "Pemain 4 menang";
      clearTimeout(autoLempar);
      kalah.play();
      return;
    }
  }

  // main lagi
  modalMenang.children[2].addEventListener("click", function () {
    window.location.reload();
  });

  //gaple
  function gaple() {
    if (pemain1.children[1].innerHTML === "lewat" && pemain2.children[1].innerHTML === "lewat" && pemain3.children[1].innerHTML === "lewat" && pemain4.children[1].innerHTML === "lewat") {
      modalMenang.style.display = "block";
      modalMenang.children[1].innerHTML = "Gaple Boss!!";
      gaplek.play();
      clearTimeout(lemparAuto);
      return;
    }
  }

  mainAhh.style.display = "none";
});
