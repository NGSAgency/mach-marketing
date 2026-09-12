// Every design family and the renderer for each page type, in one place.
// Client sites (/site/<slug>/...) and concepts (/concept/<token>/...) both
// pick their renderer here, so adding a family means adding it here, and a
// removed family can't leave a route pointing at it.
//
// Retired families (Bolt, Grove, Axis: replaced September 2026 by the
// research-led families) map to CREW, so an old record never breaks a page.
import CrewHome from './CrewHome.js'
import CrewServices from './CrewServices.js'
import CrewServiceDetail from './CrewServiceDetail.js'
import CrewAreas from './CrewAreas.js'
import CrewAreaDetail from './CrewAreaDetail.js'
import CrewCombo from './CrewCombo.js'
import CrewAbout from './CrewAbout.js'
import CrewContact from './CrewContact.js'
import CrewFAQ from './CrewFAQ.js'
import { CrewBlogIndex, CrewBlogPost } from './CrewBlog.js'
import SereneHome from './SereneHome.js'
import SereneServices from './SereneServices.js'
import SereneServiceDetail from './SereneServiceDetail.js'
import SereneAreas from './SereneAreas.js'
import SereneAreaDetail from './SereneAreaDetail.js'
import SereneCombo from './SereneCombo.js'
import SereneAbout from './SereneAbout.js'
import SereneContact from './SereneContact.js'
import SereneFAQ from './SereneFAQ.js'
import SereneConcern from './SereneConcern.js'
import SereneTeam from './SereneTeam.js'
import SereneBlogIndex, { SereneBlogPost } from './SereneBlogIndex.js'
import {
  LevelHome, LevelServices, LevelServiceDetail, LevelAreas, LevelAreaDetail, LevelCombo,
  LevelAbout, LevelContact, LevelFAQ, LevelBlogIndex, LevelBlogPost,
} from './LevelPages.js'
import {
  HearthHome, HearthServices, HearthServiceDetail, HearthAreas, HearthAreaDetail, HearthCombo,
  HearthAbout, HearthContact, HearthFAQ, HearthBlogIndex, HearthBlogPost,
} from './HearthPages.js'
import { crewTokens } from '../../../templates/crew/tokens.js'
import { sereneTokens } from '../../../templates/serene/tokens.js'
import { hearthTokens } from '../../../templates/hearth/tokens.js'
import { levelTokens } from '../../../templates/level/tokens.js'

export const FAMILIES = {
  crew: {
    label: 'Local', tokens: crewTokens,
    Home: CrewHome, Services: CrewServices, ServiceDetail: CrewServiceDetail, Areas: CrewAreas, AreaDetail: CrewAreaDetail,
    Combo: CrewCombo, About: CrewAbout, Contact: CrewContact, FAQ: CrewFAQ, BlogIndex: CrewBlogIndex, BlogPost: CrewBlogPost,
  },
  serene: {
    label: 'Editorial', tokens: sereneTokens,
    Home: SereneHome, Services: SereneServices, ServiceDetail: SereneServiceDetail, Areas: SereneAreas, AreaDetail: SereneAreaDetail,
    Combo: SereneCombo, About: SereneAbout, Contact: SereneContact, FAQ: SereneFAQ, BlogIndex: SereneBlogIndex, BlogPost: SereneBlogPost,
    Concern: SereneConcern, Team: SereneTeam,
  },
  hearth: {
    label: 'Heritage', tokens: hearthTokens,
    Home: HearthHome, Services: HearthServices, ServiceDetail: HearthServiceDetail, Areas: HearthAreas, AreaDetail: HearthAreaDetail,
    Combo: HearthCombo, About: HearthAbout, Contact: HearthContact, FAQ: HearthFAQ, BlogIndex: HearthBlogIndex, BlogPost: HearthBlogPost,
  },
  level: {
    label: 'Modern', tokens: levelTokens,
    Home: LevelHome, Services: LevelServices, ServiceDetail: LevelServiceDetail, Areas: LevelAreas, AreaDetail: LevelAreaDetail,
    Combo: LevelCombo, About: LevelAbout, Contact: LevelContact, FAQ: LevelFAQ, BlogIndex: LevelBlogIndex, BlogPost: LevelBlogPost,
  },
}

const RETIRED = { bolt: 'crew', grove: 'crew', axis: 'crew' }

/** The family a site renders in: its own when it exists, else CREW. */
export function familyKey(slug) {
  if (FAMILIES[slug]) return slug
  return RETIRED[slug] || 'crew'
}

/** The renderer for one page type. A family without it falls back to CREW's. */
export function rendererFor(slug, page) {
  return FAMILIES[familyKey(slug)][page] || FAMILIES.crew[page] || null
}

/**
 * The layouts a prospect can compare on a concept: the concept's own family
 * first, then the families suited to their industry. A family not suited to
 * the industry is never offered.
 */
export function layoutOptions(config) {
  const own = familyKey(config.template_slug)
  const suited = (config.profile?.families || []).filter(f => FAMILIES[f])
  return [...new Set([own, ...suited])].map(key => ({ key, label: FAMILIES[key].label }))
}

/**
 * Which family a concept page renders in: the layout the prospect picked (the
 * ?t= tab, remembered for the concept's other pages), provided it is offered,
 * else the concept's own.
 */
export function conceptFamily(config, requested) {
  const options = layoutOptions(config)
  return requested && options.some(o => o.key === requested) ? requested : familyKey(config.template_slug)
}
