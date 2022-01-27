import { IProfile, ProfileCardComponent } from "./components";

export const init = () => {

  //additional national parks
  const parks: IProfile[] = [
    {
      name: "Badlands",
      theme: "orange",
      image: "/parks/national-park-badlands.jpg",
      content: `
        <p><strong>South Dakota</strong></p>
        <p>
        The Badlands are a collection of buttes, pinnacles, spires, 
        and mixed-grass prairies. The White River Badlands contain the 
        largest assemblage of known late Eocene and Oligocene mammal fossils.
        The wildlife includes bison, bighorn sheep, black-footed ferrets, and 
        prairie dogs.
        </p>
      `
    },
    {
      name: "Biscayne",
      theme: "blue",
      image: "/parks/national-park-biscayne.jpg",
      content: `
        <p><strong>Florida</strong></p>
        <p>
        The central part of Biscayne Bay, this mostly underwater park at the north 
        end of the Florida Keys has four interrelated marine ecosystems: mangrove forest, 
        the Bay, the Keys, and coral reefs. Threatened animals include the West Indian manatee, 
        American crocodile, various sea turtles, and peregrine falcon.
        </p>
      `
    },
    {
      name: "Carlsbad Caverns",
      theme: "red",
      image: "/parks/national-park-carlsbad-caverns.jpg",
      content: `
        <p><strong>New Mexico</strong></p>
        <p>
        Carlsbad Caverns has 117 caves, the longest of which is over 120 miles (190 km) long. 
        The Big Room is almost 4,000 feet (1,200 m) long, and the caves are home to over 
        400,000 Mexican free-tailed bats and sixteen other species. Above ground are the 
        Chihuahuan Desert and Rattlesnake Springs.
        </p>
      `
    },
    {
      name: "Crater Lake",
      theme: "blue",
      image: "/parks/national-park-crater-lake.jpg",
      content: `
        <p><strong>Oregon</strong></p>
        <p>
        Crater Lake lies in the caldera of an ancient volcano called Mount Mazama 
        that collapsed 7,700 years ago. The lake is the deepest in the United States 
        and is noted for its vivid blue color and water clarity. Wizard Island and the 
        Phantom Ship are more recent volcanic formations within the caldera. As the lake 
        has no inlets or outlets, it is replenished only by precipitation.
        </p>
      `
    },
    {
      name: "New River Gorge",
      theme: "green",
      image: "/parks/national-park-new-river-gorge.jpg",
      content: `
        <p><strong>West Virginia</strong></p>
        <p>
        The New River Gorge is the deepest river gorge east of the Mississippi River. 
        The park is primarily the lower gorge area around the New River Gorge Bridge, 
        which features some of the country's best whitewater rafting. Smaller noncontiguous 
        sections showcase the ghost town of Thurmond, the scenic Grandview vista, and 
        Sandstone Falls. The other 65,165 acres (263.71 km2) of the redesignated national 
        river is now a national preserve, spanning 53 mi (85 km) of the New River.
        </p>
      `
    },
    {
      name: "Voyageurs",
      theme: "red",
      image: "/parks/national-park-voyageurs.jpg",
      content: `
        <p><strong>Minnesota</strong></p>
        <p>
        This park protecting four lakes near the Canada–US border is a site for canoeing, 
        kayaking, and fishing. The park also preserves a history populated by 
        Ojibwe Native Americans, French fur traders called voyageurs, and gold miners. 
        Formed by glaciers, the region features tall bluffs, rock gardens, islands, 
        bays, and several historic buildings.
        </p>
      `
    },
  ];
  parks.sort((a,b) => {
    return Math.random() - 0.5;
  });

  window.onload = () => {
    const addProfileBtn = document.getElementById('add-profile-btn') as HTMLButtonElement;
    addProfileBtn.innerText = `${parks.length} remaining`;
    addProfileBtn.disabled = parks.length === 0;

    if (addProfileBtn) {
      addProfileBtn.addEventListener('click', () => {
        const profile = parks.pop();
        if (profile) {
          const cardContainer = document.getElementById('cards');
          if (cardContainer) {
            const component = new ProfileCardComponent();
            cardContainer.appendChild(component);
            component.setProfile(profile);
          }
        }
        addProfileBtn.innerText = `${parks.length} remaining`;
        addProfileBtn.disabled = parks.length === 0;
      });
    }
  }
}

init();
