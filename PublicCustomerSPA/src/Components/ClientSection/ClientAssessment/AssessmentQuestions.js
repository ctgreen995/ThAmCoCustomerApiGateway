import {
  RevenueEnum,
  ITBudgetEnum,
  NumberOfEmployeesEnum,
  ForwardFacingSLTInfoEnum,
  ForwardFacingEmployeeInfoEnum,
  SLTphishingEducatedEnum,
  EmployeePhishingEducatedEnum,
  SignatureBasedEmailEnum,
  EmployeeInternetWorkDevicesEnum,
  EmployeePersonalDevicesAtWorkEnum,
  EmployeeSocialEngineeringEducatedEnum,
  MilitaryContractsEnum,
  GovernmentContractsEnum,
  SupplyCriticalInfrastructureEnum,
  UseCloudServicesEnum,
  PercentCloudServicesEnum,
  ImplementPatchingEnum,
  HostOwnInfrastructureEnum,
  ExternalFacingServicesEnum,
  IDSEnum,
  FirewallEnum,
  DDOSProtectionEnum,
  GeoLocationEnum,
  NumberPhysicalLocationsEnum,
  LeasedLinesEnum,
  VPNEnum,
  MarketSectorEnum,
} from "../../../Enums/ClientAssessmentEnums";

export function formQuestions() {
  return [
    {
      name: "marketSector",
      label: "Market Sector",
      options: Object.entries(MarketSectorEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select a market sector",
    },
    {
      name: "revenue",
      label: "Revenue",
      options: Object.entries(RevenueEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select revenue",
      required: true,
    },
    {
      name: "ItBudget",
      label: "% of IT budget spent on Cyber Security",
      options: Object.entries(ITBudgetEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select a percentage",
      required: true,
    },
    {
      name: "numberOfEmployees",
      label: "Number of employees",
      options: Object.entries(NumberOfEmployeesEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select number of employees",
      required: true,
    },
    {
      name: "forwardFacingSLTInfo",
      label: "Forward facing Senior Leadership Team info",
      options: Object.entries(ForwardFacingSLTInfoEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select if forward facing Senior Leadership Team info",
      required: true,
    },
    {
      name: "forwardFacingEmployeeInfo",
      label: "Forward facing employee information",
      options: Object.entries(ForwardFacingEmployeeInfoEnum).map(
        ([key, value]) => ({ key, value })
      ),
      placeholder: "Select if forward facing employee information",
      required: true,
    },
    {
      name: "SltphishingEducated",
      label: "Is the Senior Leadership Team education against Phishing attacks",
      options: Object.entries(SLTphishingEducatedEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder:
        "Select if senior leadership team educated against phishing attacks",
      required: true,
    },
    {
      name: "employeePhishingEducated",
      label: "Are employees educated against phishing attacks",
      options: Object.entries(EmployeePhishingEducatedEnum).map(
        ([key, value]) => ({ key, value })
      ),
      placeholder: "Select if employees educated against Phishing attacks",
      required: true,
    },
    {
      name: "signatureBasedEmail",
      label: "Signature based email solution",
      options: Object.entries(SignatureBasedEmailEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select if signature based email solution",
      required: true,
    },
    {
      name: "employeeInternetWorkDevices",
      label: "Do employees have access to internet on work devices",
      options: Object.entries(EmployeeInternetWorkDevicesEnum).map(
        ([key, value]) => ({ key, value })
      ),
      placeholder:
        "Select if employees have access to internet on work devices",
      required: true,
    },
    {
      name: "employeePersonalDevicesAtWork",
      label: "Do employees use personal devices at work",
      options: Object.entries(EmployeePersonalDevicesAtWorkEnum).map(
        ([key, value]) => ({ key, value })
      ),
      placeholder: "Select if employees use personal devices at work",
      required: true,
    },
    {
      name: "employeeSocialEngineeringEducated",
      label: "Are employees educated against Social Engineering attacks",
      options: Object.entries(EmployeeSocialEngineeringEducatedEnum).map(
        ([key, value]) => ({ key, value })
      ),
      placeholder:
        "Select if employees are educated against Social Engineering attacks",
      required: true,
    },
    {
      name: "militaryContracts",
      label: "Is the business involved in military contracts",
      options: Object.entries(MilitaryContractsEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select if the business is involved in military contracts",
      required: true,
    },
    {
      name: "governmentContracts",
      label: "Is the business involved in government contracts",
      options: Object.entries(GovernmentContractsEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select if the business is involved in government contracts",
      required: true,
    },
    {
      name: "supplyCriticalInfrastructure",
      label:
        "Does the business supply critical infrastructure (water, power etc.)",
      options: Object.entries(SupplyCriticalInfrastructureEnum).map(
        ([key, value]) => ({ key, value })
      ),
      placeholder: "Select if the business supplies critical infrastructure",
      required: true,
    },
    {
      name: "useCloudServices",
      label: "Does the business use cloud hosted services",
      options: Object.entries(UseCloudServicesEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select if the business uses cloud hosted services",
      required: true,
    },
    {
      name: "percentCloudServices",
      label: "How much of your infrastructure relies on the cloud",
      options: Object.entries(PercentCloudServicesEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select how much of your infrastructure relies on the cloud",
      required: true,
    },
    {
      name: "implementPatching",
      label: "Does the business implement a patch management system",
      options: Object.entries(ImplementPatchingEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder:
        "Select if the business implements a patch management system",
      required: true,
    },
    {
      name: "hostOwnInfrastructure",
      label: "Does the business host its own network infrastructure",
      options: Object.entries(HostOwnInfrastructureEnum).map(
        ([key, value]) => ({ key, value })
      ),
      placeholder:
        "Select if the business hosts its own network infrastructure",
      required: true,
    },
    {
      name: "externalFacingServices",
      label:
        "Are there externally facing services (website etc) hosted on the local network",
      options: Object.entries(ExternalFacingServicesEnum).map(
        ([key, value]) => ({ key, value })
      ),
      placeholder: "Select if there are externally facing services",
      required: true,
    },
    {
      name: "ids",
      label: "Is there an Intrusion Detection System in place on the network",
      options: Object.entries(IDSEnum).map(([key, value]) => ({ key, value })),
      placeholder: "Select if there is an IDS in place",
      required: true,
    },
    {
      name: "firewall",
      label: "Is there a Firewall in place on the network",
      options: Object.entries(FirewallEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select if there is a Firewall in place",
      required: true,
    },
    {
      name: "ddosProtection",
      label: "DDOS Protection",
      options: Object.entries(DDOSProtectionEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select",
      required: true,
    },
    {
      name: "geoLocation",
      label: "Geo-location",
      options: Object.entries(GeoLocationEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select",
      required: true,
    },
    {
      name: "numberPhysicalLocations",
      label: "How many physical sites",
      options: Object.entries(NumberPhysicalLocationsEnum).map(
        ([key, value]) => ({ key, value })
      ),
      placeholder: "Select number of sites",
      required: true,
    },
    {
      name: "leasedLines",
      label: "Does the business use Leased Lines",
      options: Object.entries(LeasedLinesEnum).map(([key, value]) => ({
        key,
        value,
      })),
      placeholder: "Select if the business uses Leased Lines",
      required: true,
    },
    {
      name: "vpn",
      label: "Does the business have a VPN solution",
      options: Object.entries(VPNEnum).map(([key, value]) => ({ key, value })),
      placeholder: "Select if the business has a VPN solution",
      required: true,
    },
  ];
}
