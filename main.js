const fileInput = document.querySelector(".file-input"),
    previweImage = document.querySelector(".previwe-image img"),
    filterName = document.querySelector(".filter-info .name"),
    filterValue = document.querySelector(".filter-info .value"),
    filterSlider = document.querySelector(".slider input"),
    rotateOptions = document.querySelectorAll(".rotate button"),
    chooseImageBtn = document.querySelector(".choose-img"),
    saveImageBtn = document.querySelector(".save-img"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    filterOptions = document.querySelectorAll(".filter button");

let brightness = 100,
    saturation = 100,
    inversion = 0,
    grayscale = 0;

let rotate = 0;

const appplyFilter = () => {
    previweImage.style.transform = `rotate(${rotate}deg)`
    previweImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0]; // getting user selected file
    if (!file) return; // return if user hasn't selected file
    previweImage.src = URL.createObjectURL(file); // passing file url as previwe img src
    previweImage.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => { // adding click event listener to all filter button
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if (option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if (option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if (option.id === "inverstion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "inverstion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    appplyFilter();
}

rotateOptions.forEach(option => { // adding click event listener to all rotate/filp button
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90; // if clicked btn is left rotate, decrement rotate value by -90
        } else if (option.id === "right") {
            rotate += 90; // if clicked btn is left rotate, increment rotate value by +90
        } else if (option.id === "rotate") {
            rotate += 90;
        }
        appplyFilter();
    })
})

const resetFilter = () => {
    // resetting all variable value to its default value
    brightness = 100;
    saturation = 100;
    inversion = 0;
    grayscale = 0;
    rotate = 0;

    filterOptions[0].click();
    appplyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previweImage.naturalWidth; // setting width image
    canvas.height = previweImage.naturalHeight; // setting heigth image

    // pplying user selected filters to canves filter
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); // from center 
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.drawImage(
        previweImage,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
    );
    const link = document.createElement("a"); // createing <a> element
    link.download = "image.jpg"; // passing <a> tag download value to "image.jpg"
    link.href = canvas.toDataURL(); // passing <a> tag href value to canvas data url
    link.click(); // clicking <a> tag so the image download
}


filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImageBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImageBtn.addEventListener("click", () => fileInput.click());