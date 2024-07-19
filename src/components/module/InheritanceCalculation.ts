export interface InheritanceProps {
  allHeirs: {
    heir: string;
    quantity: number;
  }[];
  landArea: {
    kanal: number;
    marla: number;
    foot: number;
  };
}

export type HeirWithShare = {
  heir: string;
  quantity: number;
  share?: string;
  landArea?: string;
};

export type InheritanceResult = {
  allHeirs: HeirWithShare[];
};

export interface ErrorForUsbah {
  errorUsbah: string;
}

////////////////// test //////////
interface InheritanceShares {
  [key: string]: number;
}

type InheritanceError = {
  error: string;
  totalDistributed: string;
  totalEstate: string;
};

///////////////////////////////////////////////

export function InheritanceCal(
  inputParams: InheritanceProps
): InheritanceResult | ErrorForUsbah {
  const getUsbah = findUsbah(inputParams);
  console.log("usbah is: ", getUsbah);

  if (getUsbah === "") {
    return { errorUsbah: "please contact at +92-315-7473743 for this problem" };
  }
  const totalEstateInFeet = calculateTotalEstateInFeet(inputParams.landArea);

  // Calculate shares
  const shares = calculateEveryHeirShare(
    totalEstateInFeet,
    getUsbah,
    inputParams.allHeirs
  );
  // Display results or error
  if ("error" in shares) {
    console.error(shares.error);
    console.error(`Total Distributed: ${shares.totalDistributed} marlas`);
    console.error(`Total Estate: ${shares.totalEstate} marlas`);
    return { allHeirs: inputParams.allHeirs }; // Return the original heirs in case of error
  } else {
    const formattedShares = formatAllShares(shares);
    // Append the calculated shares to each heir
    const updatedHeirs = inputParams.allHeirs.map((heir) => {
      const shareKey = heir.heir;
      return {
        ...heir,
        share: formattedShares[shareKey] || "N/A",
        landArea: formattedShares[shareKey] || "N/A", // Append the individual's formatted land share
      };
    });

    return { allHeirs: updatedHeirs };
  }
}

// Calculate inheritance based on the roles
export function calculateEveryHeirShare(
  totalEstate: number,
  usbahPresentOrNot: string,
  allHeirs: { heir: string; quantity: number }[]
): InheritanceShares | InheritanceError {
  const marlaToSquareFeet = 272.25;
  const individualShares: InheritanceShares = {};
  let fatherShare: number = 0;
  let daughters: number = 0;
  let motherShare: number = 0;
  let totalMaleUsbahShare: number = 0;
  let totalFemaleUsbahShare: number = 0;

  let widowShare = distributeShare(
    allHeirs,
    "bewah",
    isExistOrNot("beta", allHeirs) || isExistOrNot("beti", allHeirs)
      ? totalEstate / 8
      : totalEstate / 4,
    individualShares
  );
  if (isExistOrNot("beti", allHeirs) || isExistOrNot("beta", allHeirs)) {
    motherShare = distributeShare(
      allHeirs,
      "ami",
      totalEstate / 6,
      individualShares
    );
  }
  if (
    (hasValidOneUncleOrAunt("bhai", allHeirs) &&
      !isExistOrNot("behan", allHeirs)) ||
    (hasValidOneUncleOrAunt("behan", allHeirs) &&
      !isExistOrNot("bahi", allHeirs))
  ) {
    if (!isExistOrNot("beta", allHeirs) && !isExistOrNot("beti", allHeirs)) {
      motherShare = distributeShare(
        allHeirs,
        "ami",
        totalEstate / 3,
        individualShares
      );
    }
  }

  if (usbahPresentOrNot !== "abu") {
    fatherShare = distributeShare(
      allHeirs,
      "abu",
      totalEstate / 6,
      individualShares
    );
  }
  if (usbahPresentOrNot === "abu") {
    if (!isExistOrNot("ami", allHeirs) && !isExistOrNot("beta", allHeirs)) {
      fatherShare = distributeShare(
        allHeirs,
        "abu",
        totalEstate / 6,
        individualShares
      );
    }
    if (isExistOrNot("ami", allHeirs) && hasValidByti(allHeirs)) {
      fatherShare = distributeShare(
        allHeirs,
        "abu",
        totalEstate / 6,
        individualShares
      );
    }
  }

  if (usbahPresentOrNot !== "beta") {
    if (isExistOrNot("beti", allHeirs)) {
      daughters = distributeShare(
        allHeirs,
        "beti",
        hasValidByti(allHeirs) ? totalEstate / 2 : totalEstate * (2 / 3),
        individualShares
      );
    }
  }

  let remainingEstate =
    totalEstate - (widowShare + motherShare + fatherShare + daughters);

  //console.log(remainingEstate, "daughter: ", daughters);

  distributeRemainingShares(
    allHeirs,
    usbahPresentOrNot,
    remainingEstate,
    individualShares
  );

  if (usbahPresentOrNot === "beta") {
    totalMaleUsbahShare = individualShares["beta"] || 0;
    totalFemaleUsbahShare = individualShares["beti"] || 0;
  }
  if (usbahPresentOrNot === "abu") {
    if (!isExistOrNot("beti", allHeirs) && !isExistOrNot("beta", allHeirs)) {
      if (isExistOrNot("ami", allHeirs)) {
        totalFemaleUsbahShare = individualShares["ami"] || 0;
      }
    }
    totalMaleUsbahShare = individualShares["abu"] || 0;
  }
  if (usbahPresentOrNot === "bhai") {
    totalFemaleUsbahShare = individualShares["behan"] || 0;
    totalMaleUsbahShare = individualShares["bhai"] || 0;
  }

  //console.log(totalMaleUsbahShare, totalFemaleUsbahShare);

  const totalDistributed =
    widowShare +
    motherShare +
    (usbahPresentOrNot === "abu" ? 0 : fatherShare) +
    daughters +
    totalMaleUsbahShare +
    totalFemaleUsbahShare;
  if (Math.abs(totalDistributed - totalEstate) > 1e-10) {
    return {
      error: "Total distributed shares do not equal the original estate",
      totalDistributed: totalDistributed.toFixed(2),
      totalEstate: totalEstate.toFixed(2),
    };
  }

  Object.keys(individualShares).forEach((key) => {
    individualShares[key] /= marlaToSquareFeet;
    //console.log(`${individualShares[key]}`);
  });

  return individualShares;
}

// distributed shares in zul farooz
function distributeShare(
  allHeirs: { heir: string; quantity: number }[],
  heirName: string,
  shareFraction: number,
  individualShares: InheritanceShares
): number {
  const heir = allHeirs.find((h) => h.heir === heirName);
  if (heir) {
    individualShares[heirName] = shareFraction;
    return shareFraction;
    // if (heir.heir !== "beti") {
    //   const share = shareFraction * heir.quantity;
    //   individualShares[heirName] = share;
    //   return share;
    // } else {
    //   individualShares[heirName] = shareFraction;
    //   return shareFraction;
    // }
  }
  return 0;
}

function distributeRemainingShares(
  allHeirs: { heir: string; quantity: number }[],
  usbahPresentOrNot: string,
  remainingEstate: number,
  individualShares: InheritanceShares
) {
  if (usbahPresentOrNot === "beta") {
    const sons = allHeirs.find((h) => h.heir === "beta")?.quantity || 0;
    const daughters = allHeirs.find((h) => h.heir === "beti")?.quantity || 0;

    const totalShares = sons * 2 + daughters;
    //console.log(totalShares);

    if (totalShares === 0) return;

    const shareAmount = remainingEstate / totalShares;

    if (sons > 0) {
      individualShares["beta"] = shareAmount * 2 * sons;
    }
    if (daughters > 0) {
      individualShares["beti"] = shareAmount * daughters;
    }
  }
  if (usbahPresentOrNot === "abu") {
    if (
      !isExistOrNot("beta", allHeirs) &&
      !isExistOrNot("beti", allHeirs) &&
      isExistOrNot("ami", allHeirs)
    ) {
      const abu = allHeirs.find((h) => h.heir === "abu")?.quantity || 0;
      const ami = allHeirs.find((h) => h.heir === "ami")?.quantity || 0;

      const totalShares = abu * 2 + ami;

      if (totalShares === 0) return;

      const shareAmount = remainingEstate / totalShares;

      if (abu > 0) {
        individualShares["abu"] = shareAmount * 2 * abu;
        //console.log(individualShares["abu"] / 272);
      }
      if (ami > 0) {
        individualShares["ami"] = shareAmount * ami;
        //console.log(individualShares["ami"] / 272);
      }
    } else {
      individualShares["abu"] += remainingEstate;
    }
  }
  if (usbahPresentOrNot === "bhai") {
    const brothers = allHeirs.find((h) => h.heir === "bhai")?.quantity || 0;
    const sisters = allHeirs.find((h) => h.heir === "behan")?.quantity || 0;

    const totalShares = brothers * 2 + sisters;
    //console.log(totalShares);

    if (totalShares === 0) return;

    const shareAmount = remainingEstate / totalShares;

    if (brothers > 0) {
      individualShares["bhai"] = shareAmount * 2 * brothers;
    }
    if (sisters > 0) {
      individualShares["behan"] = shareAmount * sisters;
    }
  }
}

/// convert into feet
function calculateTotalEstateInFeet({
  kanal,
  marla,
  foot,
}: {
  kanal: number;
  marla: number;
  foot: number;
}): number {
  //let totalFeet = kanal * 20 * 272.25 + marla * 272.25 + foot;
  let kanalToFoot: number = 0;
  if (kanal > 0) {
    kanalToFoot = kanal * 20;
  }
  if (marla > 0) {
    kanalToFoot += marla;
  }
  if (kanalToFoot > 0) {
    kanalToFoot = kanalToFoot * 272.25;
  }
  if (foot > 0) {
    kanalToFoot += foot;
  }
  return kanalToFoot;
}

// Format share function
function formatShare(share: number): string {
  const marlas = Math.floor(share);
  const fraction = share - marlas;

  const feet = Math.round(fraction * 272.25);
  const kanals = Math.floor(marlas / 20);
  const remainingMarlas = marlas % 20;

  return `${kanals}-${remainingMarlas}-${feet}`;
}

function formatAllShares(shares: InheritanceShares): { [key: string]: string } {
  const formattedShares: { [key: string]: string } = {};

  for (const key in shares) {
    if (shares.hasOwnProperty(key)) {
      formattedShares[key] = formatShare(
        shares[key as keyof InheritanceShares]
      );
    }
  }

  return formattedShares;
}
////////////////////////////////////

// find usbah
function findUsbah(inputParams: InheritanceProps): string {
  let usbah: string = "";
  for (let index = 0; index < inputParams.allHeirs.length; index++) {
    const check = inputParams.allHeirs[index];
    if (hasBeta(inputParams.allHeirs)) {
      usbah = "beta";
      break;
    } else {
      if (
        check.heir === "abu" &&
        !isExistOrNot("shohar", inputParams.allHeirs) &&
        hasValidByti(inputParams.allHeirs)
      ) {
        usbah = check.heir;
        break;
      } else if (
        check.heir === "abu" &&
        !isExistOrNot("ami", inputParams.allHeirs) &&
        ((isExistOrNot("shohar", inputParams.allHeirs) &&
          hasValidByti(inputParams.allHeirs)) ||
          isExistOrNot("bewah", inputParams.allHeirs))
      ) {
        usbah = check.heir;
        break;
      } else if (
        (check.heir === "bhai" || check.heir === "behan") &&
        !isExistOrNot("abu", inputParams.allHeirs) &&
        isExistOrNot("shohar", inputParams.allHeirs) &&
        (hasValidByti(inputParams.allHeirs) ||
          !isExistOrNot("beti", inputParams.allHeirs))
      ) {
        usbah = check.heir;
        break;
      } else if (
        check.heir === "abu" &&
        !isExistOrNot("beti", inputParams.allHeirs)
      ) {
        usbah = check.heir;
        break;
      } else if (
        (check.heir === "bhai" || check.heir === "behan") &&
        !isExistOrNot("abu", inputParams.allHeirs) &&
        !isExistOrNot("ami", inputParams.allHeirs) &&
        (isExistOrNot("bewah", inputParams.allHeirs) ||
          isExistOrNot("shohar", inputParams.allHeirs))
      ) {
        usbah = check.heir;
        break;
      } else if (
        (check.heir === "bhai" || check.heir === "behan") &&
        !isExistOrNot("abu", inputParams.allHeirs) &&
        !hasBeta(inputParams.allHeirs)
      ) {
        usbah = check.heir;
        break;
      }
    }
  }
  return usbah;
}

// find son or beta
function hasBeta(allHeirs: { heir: string; quantity: number }[]): boolean {
  const result = allHeirs.some((heir) => heir.heir === "beta");
  return result;
}

// find byti and should be 1
function hasValidByti(allHeirs: { heir: string; quantity: number }[]): boolean {
  const byti = allHeirs.find((heir) => heir.heir === "beti");
  const result = byti ? byti.quantity <= 1 : false;

  return result;
}

function isExistOrNot(
  memberName: string,
  allHeirs: { heir: string; quantity: number }[]
): boolean {
  const result = allHeirs.some((heir) => heir.heir === `${memberName}`);
  return result;
}

function hasValidOneUncleOrAunt(
  memberName: string,
  allHeirs: { heir: string; quantity: number }[]
): boolean {
  const uncleOrAunt = allHeirs.find((heir) => heir.heir === `${memberName}`);
  const result = uncleOrAunt ? uncleOrAunt.quantity <= 1 : false;

  return result;
}
