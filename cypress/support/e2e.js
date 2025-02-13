import "cypress-axe"

import { greppedTestToggle, addGrepButtons } from "cypress-plugin-grep-boxes"
import registerCypressGrep from "@bahmutov/cy-grep/src/support"

registerCypressGrep()

greppedTestToggle()
addGrepButtons()

import "./commands"
