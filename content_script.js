

function get_first_article() {
    let article = null;
    let tags = document.getElementsByTagName("article");
    if( tags != null && 0 < tags.length ) {
        for( let art of tags ) {
            article = art.parentElement.parentElement.parentElement;
            break;
        }
    }
    return article;
}


function obtain_class_name() {
    let class_name = null;
    let tags = document.getElementsByTagName("section");
    if( tags != null && 0 < tags.length ) {
        for( let sec of tags ) {
            let sec_label = sec.getAttribute("aria-labelledby");
            if( sec_label != null && sec_label == "accessible-list-0" ) {
                class_name = sec.getAttribute("class").split(" ")[0];
                break;
            }
        }
    }
    return class_name;
}


function insert_element_after_header(element) {
    let tags = document.getElementsByTagName("section");
    if( tags != null && 0 < tags.length ) {
        for( let sec of tags ) {
            let sec_label = sec.getAttribute("aria-labelledby");
            if( sec_label != null && sec_label == "accessible-list-0" ) {
                let header = document.getElementById("accessible-list-0");
                if( header != null && header.nextSibling != null ) {
                    if( header.nextSibling.innerText != element.innerText ) {
                        sec.insertBefore(element, header.nextSibling);
                        break;
                    }
                }
            }
        }
    }
}


function insert_my_element_after_header() {
    let div_tag = document.createElement("div");
    div_tag.innerHTML = "ホゲホゲ";
    div_tag.setAttribute("class", obtain_class_name());
    insert_element_after_header(div_tag);
}


function register_timeline_observer() {
    let header = document.getElementById("accessible-list-0");
    if( header != null ) {
        let target = header.nextSibling.firstElementChild;
        if( target != null ) {
            let timeline_observer = new MutationObserver(insert_my_element_after_header);
            timeline_observer.observe(target, {
                attributes:    true,
                childList:     true,
                characterData: true
            });
        }
    }
}


function register_head_observer() {
    let head_observer = new MutationObserver(register_timeline_observer);
    head_observer.observe(document.getElementsByTagName("head")[0], {
        attributes:    true,
        childList:     true,
        characterData: true
    });
}

register_head_observer();
