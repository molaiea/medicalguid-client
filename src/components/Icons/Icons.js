import L from 'leaflet';

var icon_size = [25, 25]
var icon_clinics = L.icon({
    iconUrl: require('../../assets/icons/clinics.png'),
    iconSize:     icon_size, // size of the icon
});
var icon_pharmas = L.icon({
    iconUrl: require('../../assets/icons/pharmas.png'),
    iconSize:     icon_size, // size of the icon
});
var icon_dentists = L.icon({
    iconUrl: require('../../assets/icons/dentists.png'),
    iconSize:     icon_size, // size of the icon
});
var icon_labos = L.icon({
    iconUrl: require('../../assets/icons/laboratoires.png'),
    iconSize:     icon_size, // size of the icon
});
var icon_opticians = L.icon({
    iconUrl: require('../../assets/icons/opticiens.png'),
    iconSize:     icon_size, // size of the icon
});
var icon_transfusion = L.icon({
    iconUrl: require('../../assets/icons/transfusion.png'),
    iconSize:     icon_size, // size of the icon
});

const Icons = {
    clinics: icon_clinics,
    dentists: icon_dentists,
    labos: icon_labos,
    opticians: icon_opticians,
    pharmacies: icon_pharmas,
    transfusion: icon_transfusion
}
export default Icons;