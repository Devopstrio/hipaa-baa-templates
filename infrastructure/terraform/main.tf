provider "azurerm" {
  features {}
}

# --- BAA Platform Resource Group ---

resource "azurerm_resource_group" "baa" {
  name     = "rg-${var.project_name}-${var.environment}"
  location = var.location
}

# --- Backend Data Hub (Postgres) ---

resource "azurerm_postgresql_flexible_server" "baa" {
  name                   = "psql-${var.project_name}-hub-${var.environment}"
  resource_group_name    = azurerm_resource_group.baa.name
  location               = azurerm_resource_group.baa.location
  version                = "13"
  administrator_login    = "baaadmin"
  administrator_password = var.db_password
  storage_mb             = 32768
  sku_name               = "B_Standard_B1ms"
}

# --- Contract Artifact Storage (Blob) ---

resource "azurerm_storage_account" "contracts" {
  name                     = "st${var.project_name}vault${var.environment}"
  resource_group_name      = azurerm_resource_group.baa.name
  location                 = azurerm_resource_group.baa.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  blob_properties {
    versioning_enabled = true
  }

  tags = {
    DataClass = "Confidential-PHI-Legal"
    HIPAA     = "Audit-Ready"
  }
}

# --- Secrets Management (KeyVault) ---

resource "azurerm_key_vault" "baa" {
  name                = "kv-${var.project_name}-${var.environment}"
  location            = azurerm_resource_group.baa.location
  resource_group_name = azurerm_resource_group.baa.name
  tenant_id           = var.tenant_id
  sku_name            = "standard"

  purge_protection_enabled = true
}
